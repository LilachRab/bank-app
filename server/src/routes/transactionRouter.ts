import { Router } from 'express';
import httpStatus from 'http-status-codes';

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
    transactionRouter.post('/create', async (req, res) => {
        res.status(httpStatus.OK).json({ message: 'Transaction created successfully' });
    });
    return transactionRouter;
};
