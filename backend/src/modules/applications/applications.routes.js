import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { createHandler, listHandler, updateHandler, deleteHandler } from './applications.controller.js';

const router = Router();

router.use(requireAuth);

router.post('/',      createHandler);
router.get('/',       listHandler);
router.patch('/:id',  updateHandler);
router.delete('/:id', deleteHandler);

export default router;
