import { Router } from 'express';
import httpStatus from 'http-status-codes';
import { register, login } from '../controllers/authController';

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

    return authRouter;
};
