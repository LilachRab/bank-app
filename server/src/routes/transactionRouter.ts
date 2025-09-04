import { Router } from 'express';
import { createTransaction } from '../controllers/transactionController';

export const createTransactionRouter = () => {
    const transactionRouter = Router();

    /**
     * @swagger
     * /api/transactions/create:
     *   post:
     *     summary: Create a transaction
     *     tags: [Transactions]
     *     responses:
     *       200:
     *         description: Transaction created successfully
     */
    transactionRouter.post('/create', createTransaction);

    return transactionRouter;
};
