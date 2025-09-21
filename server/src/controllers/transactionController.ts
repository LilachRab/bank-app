import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { transactionService } from '../services/transactionService';

export const createTransaction = async (req: Request, res: Response) => {
    const { receiverEmail, transactionAmount } = req.body;
    const sender = req.user;

    if (!sender) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    if (sender.email === receiverEmail) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'You cannot send money to yourself.' });
    }

    await transactionService.insertTransaction(sender.email, receiverEmail, transactionAmount);
    res.status(httpStatus.OK).json({ message: 'Transaction created successfully' });
};

export const getAllTransactions = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }
    const transactions = await transactionService.getUserTransactions(user.email);
    res.status(httpStatus.OK).json(transactions);
};
