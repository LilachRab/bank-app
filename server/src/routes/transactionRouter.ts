import { Router } from 'express';
import { createTransaction, getAllTransactions } from '../controllers/transactionController';

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
    /**
     * @swagger
     * /api/transactions:
     *   get:
     *     summary: Get all transactions for a user
     *     tags: [Transactions]
     */
    transactionRouter.get('/', getAllTransactions);

    return transactionRouter;
};
