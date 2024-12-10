import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getDishes,
  getDish,
  createDish,
  updateDish,
  updateDishByParams,
  deleteDish,
  getDishesByDate,
  getDishesByCategory,
} from '../controllers/dish.controller.js';
import { createSchema } from '../schemas/dish.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/dish/', authRequired, getDishes);

router.get('/dish/:id', authRequired, getDish);

router.post(
  '/dish/:id',
  authRequired,
  // validateSchema(createSchema),
  createDish
);

router.put('/dish/:id', authRequired, updateDish);

router.put('/dish/:id', authRequired, updateDish);
router.put('/dish/:id/:category', authRequired, updateDishByParams);

router.delete('/dish/:id', authRequired, deleteDish);

router.get('/dish/date/:date', authRequired, getDishesByDate);

router.get('/dish/category/:category', authRequired, getDishesByCategory);

export default router;
