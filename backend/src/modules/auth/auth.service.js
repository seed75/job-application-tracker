import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from './auth.repository.js';
import { AppError } from '../../utils/AppError.js';

const SALT_ROUNDS = 10;

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  });
}

export async function register({ email, password, name }) {
  const existing = await findUserByEmail(email);
  if (existing) throw new AppError('Email already in use', 409);

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({ email, passwordHash, name });

  return { token: signToken(user.id), user };
}

export async function login({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError('Invalid credentials', 401);

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new AppError('Invalid credentials', 401);

  const { password_hash: _, ...safeUser } = user;
  return { token: signToken(user.id), user: safeUser };
}
