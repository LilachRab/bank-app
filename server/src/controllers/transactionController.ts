import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { TransactionInput } from '../models/transaction';
import { transactionService } from '../services/transactionService';
import { getIO } from '../sockets';

export const createTransaction = async (req: Request, res: Response) => {
    const transactionData: TransactionInput = req.body;
    const sender = req.user;

    if (!sender) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    const transaction = await transactionService.insertTransaction(sender, transactionData);
    res.status(httpStatus.OK).json({ message: 'Transaction created successfully', transaction: transaction });

    getIO().to(transactionData.receiverEmail).emit('money_received', transaction);
};

export const getAllTransactions = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    const transactions = await transactionService.getUserTransactions(user.email);
    res.status(httpStatus.OK).json(transactions);
};
