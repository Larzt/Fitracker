import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
  loadFood,
} from '../controllers/food.controller.js';
import { createSchema, updateSchema } from '../schemas/food.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/food', authRequired, getFoods);
router.get('/food/:id', authRequired, getFood);
router.post('/food', authRequired, validateSchema(createSchema), createFood);
router.put('/food/:id', authRequired, validateSchema(updateSchema), updateFood);
router.delete('/food/:id', authRequired, deleteFood);

router.post('/food/load/data', authRequired, loadFood);

export default router;
