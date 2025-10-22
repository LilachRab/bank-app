import { Router } from 'express';
import httpStatus from 'http-status-codes';
import { register, login, logout } from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middleware/validationMiddleware';

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
    authRouter.post('/register', validateRegistration, register);

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
    authRouter.post('/login', validateLogin, login);

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

    return authRouter;
};
