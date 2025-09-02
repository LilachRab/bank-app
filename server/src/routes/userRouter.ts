import { Router } from 'express';
import httpStatus from 'http-status-codes';

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
    userRouter.get('/:userName', async (req, res) => {
        res.status(httpStatus.OK).json({ message: 'Got user name' });
    });

    return userRouter;
};
