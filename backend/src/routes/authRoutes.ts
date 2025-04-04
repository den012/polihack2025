import express from 'express';
import { Router } from 'express';
import { loginUser, getProtectedData, logoutUser, getUserInfo } from '../controller/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/user', authMiddleware, getUserInfo);

router.get('/protected', authMiddleware, getProtectedData);

export default router;