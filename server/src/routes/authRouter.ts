import { Router } from 'express';
import httpStatus from 'http-status-codes';
import { register, login, logout, me } from '../controllers/authController';
import { protectByToken } from '../middleware/authMiddleware';

export const createAuthRouter = () => {
    const authRouter = Router();

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Register
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: User registered successfully
     */
    authRouter.post('/register', register);

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: User logged in successfully
     */
    authRouter.post('/login', login);

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     summary: Logout
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: User logged out successfully
     */
    authRouter.post('/logout', logout);

    /**
     * @swagger
     * /auth/me:
     *   get:
     *     summary: Get current user
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Returns the current user
     */
    authRouter.get('/me', protectByToken, me);

    return authRouter;
};
