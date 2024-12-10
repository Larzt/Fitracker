import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getObjetives,
  getObjetive,
  createObjetive,
  updateObjetive,
} from '../controllers/objetive.controller.js';
const router = Router();

router.get('/objetive/', authRequired, getObjetives);
router.get('/objetive/:id', authRequired, getObjetive);
router.post('/objetive', authRequired, createObjetive);
router.put('/objetive/:id', authRequired, updateObjetive);

export default router;
