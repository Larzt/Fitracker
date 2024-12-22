import { Router } from 'express';
import multer from 'multer';
import {
  login,
  register,
  logout,
  profile,
  avatar,
  uploadAvatar,
  verifyToken,
  deleteAvatar,
  getWeight,
  getCalories,
  updateWeight,
  updateCalories,
  getUsers,
  searchAvatar,
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
const router = Router();
const upload = multer({ dest: 'client/public/uploads/' });

router.get('/users', authRequired, getUsers);
router.get('/search/avatar/:id', authRequired, searchAvatar);

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get('/metrics/weight', authRequired, getWeight);
router.put('/metrics/weight', authRequired, updateWeight);
router.get('/metrics/calories', authRequired, getCalories);
router.put('/metrics/calories', authRequired, updateCalories);

router.get('/profile', authRequired, profile);
router.get('/profile/avatar', authRequired, avatar);
router.delete('/profile/avatar', authRequired, deleteAvatar);
router.post(
  '/profile/avatar',
  authRequired,
  upload.single('avatarImage'),
  uploadAvatar
);

router.get('/verify', verifyToken);

export default router;
