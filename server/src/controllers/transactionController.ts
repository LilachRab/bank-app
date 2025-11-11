import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { transactionService } from '../services/transactionService';
import { TransactionInput } from '../models/transaction';

export const createTransaction = async (req: Request, res: Response) => {
    const transactionData: TransactionInput = req.body;
    const sender = req.user;

    if (!sender) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    try {
        await transactionService.insertTransaction(sender, transactionData);
        res.status(httpStatus.OK).json({ message: 'Transaction created successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Transaction failed';

        let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        if (errorMessage.includes('not found')) {
            statusCode = httpStatus.NOT_FOUND;
        } else if (errorMessage.includes('enough money') || errorMessage.includes('yourself')) {
            statusCode = httpStatus.BAD_REQUEST;
        }

        res.status(statusCode).json({ message: errorMessage });
    }
};

export const getAllTransactions = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    const transactions = await transactionService.getUserTransactions(user.email);
    res.status(httpStatus.OK).json(transactions);
};
