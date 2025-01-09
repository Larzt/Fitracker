import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getExers,
  getExer,
  createExer,
  updateExer,
  deleteExer,
  loadExers,
  setVisible,
  toggleFavourite,
  getExercisesFromUser,
  copyExer,
} from '../controllers/exercise.controller.js';
import { createSchema, updateSchema } from '../schemas/exercise.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/user/exercise/:id', authRequired, getExercisesFromUser);

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

router.post('/copy/exer/:id', authRequired, copyExer);

router.delete('/exercise/:id', authRequired, deleteExer);
router.post('/exercise/load/data', loadExers);

router.put('/exercise/visible/:id', setVisible);
router.patch('/exercise/favourite/:id', toggleFavourite);

export default router;
