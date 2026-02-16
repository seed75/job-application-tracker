import {
  createApplication,
  findApplicationById,
  listApplications,
  updateApplication,
  deleteApplication,
  insertStatusHistory,
} from './applications.repository.js';
import { AppError } from '../../utils/AppError.js';

export async function create(userId, data) {
  const app = await createApplication(userId, data);
  await insertStatusHistory(app.id, null, app.status);
  return app;
}

export async function list(userId, filters) {
  return listApplications(userId, filters);
}

export async function update(id, userId, fields) {
  const existing = await findApplicationById(id, userId);
  if (!existing) throw new AppError('Application not found', 404);

  const updated = await updateApplication(id, userId, fields);

  if (fields.status && fields.status !== existing.status) {
    await insertStatusHistory(id, existing.status, fields.status);
  }

  return updated;
}

export async function remove(id, userId) {
  const deleted = await deleteApplication(id, userId);
  if (!deleted) throw new AppError('Application not found', 404);
}
