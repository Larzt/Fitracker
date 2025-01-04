import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getRoutines,
  getRoutine,
  createRoutine,
  deleteRoutine,
  getRoutinesByDate,
  getRoutinesByCategory,
  getRoutinesByMuscle,
  updateRoutine,
  addExtraData,
  deleteAdditionalData,
} from '../controllers/routine.controller.js';

const router = Router();

router.get('/routine', authRequired, getRoutines);

router.put('/routine/add-extra/:id', authRequired, addExtraData);

router.get('/routine/:id', authRequired, getRoutine);

router.post('/routine/:id', authRequired, createRoutine);

router.put('/routine/:id', authRequired, updateRoutine);

router.delete('/routine/:id', authRequired, deleteRoutine);

router.get('/routine/date/:date', authRequired, getRoutinesByDate);

router.get('/routine/category/:category', authRequired, getRoutinesByCategory);

router.get('/routine/muscle/:muscle', authRequired, getRoutinesByMuscle);

router.patch('/routine/:id/additional-data', deleteAdditionalData);

export default router;
