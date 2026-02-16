import Joi from 'joi';
import { register, login } from './auth.service.js';
import { AppError } from '../../utils/AppError.js';

const registerSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name:     Joi.string().min(1).max(100).required(),
});

const loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function registerHandler(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const result = await register(value);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginHandler(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const result = await login(value);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
