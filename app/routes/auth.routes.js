import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', authController.register);
router.get('/signin', authController.signIn);
router.get('/signout', authController.signOut);

export default router;