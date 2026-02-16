import Joi from 'joi';
import { create, list, update, remove } from './applications.service.js';
import { AppError } from '../../utils/AppError.js';

const VALID_STATUSES = ['wishlist', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'];

const createSchema = Joi.object({
  company:     Joi.string().min(1).max(200).required(),
  position:    Joi.string().min(1).max(200).required(),
  status:      Joi.string().valid(...VALID_STATUSES).default('wishlist'),
  appliedDate: Joi.date().iso().allow(null),
  jobUrl:      Joi.string().uri().allow(null, ''),
  location:    Joi.string().max(200).allow(null, ''),
  salaryMin:   Joi.number().integer().min(0).allow(null),
  salaryMax:   Joi.number().integer().min(0).allow(null),
  notes:       Joi.string().allow(null, ''),
});

const updateSchema = Joi.object({
  company:     Joi.string().min(1).max(200),
  position:    Joi.string().min(1).max(200),
  status:      Joi.string().valid(...VALID_STATUSES),
  appliedDate: Joi.date().iso().allow(null),
  jobUrl:      Joi.string().uri().allow(null, ''),
  location:    Joi.string().max(200).allow(null, ''),
  salaryMin:   Joi.number().integer().min(0).allow(null),
  salaryMax:   Joi.number().integer().min(0).allow(null),
  notes:       Joi.string().allow(null, ''),
}).min(1);

const listQuerySchema = Joi.object({
  status:  Joi.string().valid(...VALID_STATUSES),
  company: Joi.string().max(200),
});

export async function createHandler(req, res, next) {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);
    const app = await create(req.user.sub, value);
    res.status(201).json(app);
  } catch (err) {
    next(err);
  }
}

export async function listHandler(req, res, next) {
  try {
    const { error, value } = listQuerySchema.validate(req.query);
    if (error) throw new AppError(error.details[0].message, 400);
    const apps = await list(req.user.sub, value);
    res.json(apps);
  } catch (err) {
    next(err);
  }
}

export async function updateHandler(req, res, next) {
  try {
    const { error, value } = updateSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);
    const app = await update(req.params.id, req.user.sub, value);
    res.json(app);
  } catch (err) {
    next(err);
  }
}

export async function deleteHandler(req, res, next) {
  try {
    await remove(req.params.id, req.user.sub);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
