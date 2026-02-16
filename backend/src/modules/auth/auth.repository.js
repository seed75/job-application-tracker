import pool from '../../config/db.js';

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    'SELECT id, email, password_hash, name FROM users WHERE email = $1',
    [email]
  );
  return rows[0] ?? null;
}

export async function createUser({ email, passwordHash, name }) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, name)
     VALUES ($1, $2, $3)
     RETURNING id, email, name, created_at`,
    [email, passwordHash, name]
  );
  return rows[0];
}
