import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goals.controller.js';
import { createSchema, updateSchema } from '../schemas/goals.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/goals', authRequired, getGoals);
router.get('/goals/:id', authRequired, getGoal);
router.post('/goals', authRequired, validateSchema(createSchema), createGoal);
router.put(
  '/goals/:id',
  authRequired,
  validateSchema(updateSchema),
  updateGoal
);
router.delete('/goals/:id', authRequired, deleteGoal);

export default router;
