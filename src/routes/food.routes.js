import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
  loadFood,
  setVisible,
  toggleFavourite,
  getFoodsFromUser,
  copyFood,
} from '../controllers/food.controller.js';
import { createSchema, updateSchema } from '../schemas/food.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/user/food/:id', authRequired, getFoodsFromUser);

router.get('/food', authRequired, getFoods);
router.get('/food/:id', authRequired, getFood);

router.post('/food', authRequired, validateSchema(createSchema), createFood);
router.post('/copy/food/:id', authRequired, copyFood);

router.put('/food/:id', authRequired, validateSchema(updateSchema), updateFood);
router.delete('/food/:id', authRequired, deleteFood);

router.post('/food/load/data', loadFood);

router.put('/food/visible/:id', setVisible);
router.patch('/food/favourite/:id', toggleFavourite);

export default router;
