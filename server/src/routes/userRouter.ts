import { Router } from 'express';
import { getUser } from '../controllers/userController';

export const createUserRouter = () => {
    const userRouter = Router();

    /**
     * @swagger
     * /api/users/me:
     *   get:
     *     summary: Get current user
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: User retrieved successfully
     */
    userRouter.get('/me', getUser);

    return userRouter;
};
