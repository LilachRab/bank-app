import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { userService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
    const authenticatedUserEmail = req.body.user?.email;

    if (!authenticatedUserEmail) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized' });
    }

    const user = await userService.getUserByEmail(authenticatedUserEmail);
    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    res.status(httpStatus.OK).json(user);
};
