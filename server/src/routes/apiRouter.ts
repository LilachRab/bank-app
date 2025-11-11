import { Router } from 'express';
import { createTransactionRouter } from './transactionRouter';
import { createUserRouter } from './userRouter';
import { protectByToken } from '../middleware/authMiddleware';

export const createApiRouter = () => {
    const apiRouter = Router();

    apiRouter.use('/transactions', protectByToken, createTransactionRouter());
    apiRouter.use('/users', protectByToken, createUserRouter());

    return apiRouter;
};
