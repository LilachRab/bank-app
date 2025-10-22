import { Router } from 'express';
import { createTransaction, getAllTransactions } from '../controllers/transactionController';
import { validateTransaction } from '../middleware/validationMiddleware';

export const createTransactionRouter = () => {
    const transactionRouter = Router();

    /**
     * @swagger
     * /api/transactions:
     *   get:
     *     summary: Get all transactions for a user
     *     tags: [Transactions]
     */
    transactionRouter.get('/', getAllTransactions);

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
    transactionRouter.post('/create', validateTransaction, createTransaction);

    return transactionRouter;
};
