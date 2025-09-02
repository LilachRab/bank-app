import { Router } from 'express';
import httpStatus from 'http-status-codes';

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
    authRouter.post('/register', async (req, res) => {
        res.status(httpStatus.OK).json({ message: 'registered successfully' });
    });

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
    authRouter.post('/login', async (req, res) => {
        res.status(httpStatus.OK).json({ message: 'Logged in successfully' });
    });

    return authRouter;
};
