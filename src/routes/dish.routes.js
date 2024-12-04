import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getDishes,
  getDish,
  createDish,
  getDishesByDate,
} from '../controllers/dish.controller.js';

const router = Router();

router.get('/dish/', authRequired, getDishes);

router.get('/dish/:id', authRequired, getDish);

router.post('/dish/:id', authRequired, createDish);

router.get('/dish/date/:date', authRequired, getDishesByDate);

export default router;