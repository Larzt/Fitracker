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
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
const router = Router();
const upload = multer({ dest: 'client/uploads/' });

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get('/profile', authRequired, profile);

router.get('/profile/avatar', authRequired, avatar);

router.post(
  '/profile/avatar',
  authRequired,
  upload.single('avatarImage'),
  uploadAvatar
);

router.get('/verify', verifyToken);

export default router;
