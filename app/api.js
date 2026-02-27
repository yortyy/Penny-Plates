import express from 'express';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import userRoutes from './routes/user.routes.js';
import foodsRoutes from './routes/food.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/user', userRoutes);
router.use('/food', foodsRoutes);

export default router;