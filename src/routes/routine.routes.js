import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getRoutines,
  getRoutine,
  createRoutine,
  deleteRoutine,
  getRoutinesByDate,
} from '../controllers/routine.controller.js';

const router = Router();

router.get('/routine/', authRequired, getRoutines);

router.get('/routine/:id', authRequired, getRoutine);

router.post('/routine/:id', authRequired, createRoutine);

router.delete('/routine/:id', authRequired, deleteRoutine);

router.get('/routine/date/:date', authRequired, getRoutinesByDate);

export default router;
