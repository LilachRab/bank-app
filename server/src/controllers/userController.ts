import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { userService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
    const authenticatedUser = req.user;

    if (!authenticatedUser) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    res.status(httpStatus.OK).json(authenticatedUser);
};
