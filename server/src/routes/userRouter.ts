import { Router } from 'express';
import { getUser } from '../controllers/userController';

export const createUserRouter = () => {
    const userRouter = Router();

    /**
     * @swagger
     * /api/users/:userEmail:
     *   get:
     *     summary: Get a user
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: User retrieved successfully
     */
    userRouter.get('/:userEmail', getUser);

    return userRouter;
};
