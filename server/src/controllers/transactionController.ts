import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { transactionService } from '../services/transactionService';

interface AuthRequest extends Request {
    user?: any;
}

export const createTransaction = async (req: AuthRequest, res: Response) => {
    const { receiverEmail, transactionAmount } = req.body;
    const sender = req.user;

    if (sender.email === receiverEmail) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'You cannot send money to yourself.' });
    }

    await transactionService.createDbTransaction(sender.email, receiverEmail, transactionAmount);
    res.status(httpStatus.OK).json({ message: 'Transaction created successfully' });
};
