import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getExers,
  getExer,
  createExer,
  updateExer,
  deleteExer,
  loadExers,
} from '../controllers/exercise.controller.js';
import { createSchema, updateSchema } from '../schemas/exercise.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/exercise', authRequired, getExers);
router.get('/exercise/:id', authRequired, getExer);
router.post(
  '/exercise',
  authRequired,
  validateSchema(createSchema),
  createExer
);
router.put(
  '/exercise/:id',
  authRequired,
  validateSchema(updateSchema),
  updateExer
);

router.delete('/exercise/:id', authRequired, deleteExer);
router.post('/exercise/load/data', authRequired, loadExers);

export default router;
