import { Router } from 'express';
import { getUser } from '../controllers/userController';

export const createUserRouter = () => {
    const userRouter = Router();

    /**
     * @swagger
     * /api/users/:userName:
     *   get:
     *     summary: Get a user
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: User retrieved successfully
     */
    userRouter.get('/:userName', getUser);

    return userRouter;
};
