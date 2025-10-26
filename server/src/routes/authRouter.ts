import { Router } from 'express';
import httpStatus from 'http-status-codes';
import { signup, signin, signout } from '../controllers/authController';
import { validateSignup, validateSignin } from '../middleware/validationMiddleware';

export const createAuthRouter = () => {
    const authRouter = Router();

    /**
     * @swagger
     * /auth/signup:
     *   post:
     *     summary: Signup
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: User signed up successfully
     */
    authRouter.post('/signup', validateSignup, signup);

    /**
     * @swagger
     * /auth/signin:
     *   post:
     *     summary: Signin
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: User signed in successfully
     */
    authRouter.post('/signin', validateSignin, signin);

    /**
     * @swagger
     * /auth/signout:
     *   post:
     *     summary: Signout
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: User signed out successfully
     */
    authRouter.post('/signout', signout);

    return authRouter;
};
