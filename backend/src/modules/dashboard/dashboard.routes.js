import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { summaryHandler } from './dashboard.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/summary', summaryHandler);

export default router;
