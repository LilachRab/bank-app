import { Router } from 'express';
import { createTransactionRouter } from './transactionRouter';
import { createUserRouter } from './userRouter';
import { protectByToken } from '../middleware/authMiddleware';

export const createApiRouter = () => {
    const apiRouter = Router();

    /**
     * @swagger
     * /api/transactions:
     *   post:
     *     summary: All transactions
     *     tags: [Transactions]
     *     responses:
     *       200:
     *         description: Transaction created successfully
     */
    apiRouter.use('/transactions', protectByToken, createTransactionRouter());

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: All users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: User created successfully
     */
    apiRouter.use('/users', protectByToken, createUserRouter());

    return apiRouter;
};
