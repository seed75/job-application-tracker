import { summary } from './dashboard.service.js';

export async function summaryHandler(req, res, next) {
  try {
    const data = await summary(req.user.sub);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
