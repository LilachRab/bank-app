import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { userService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
    const requestedEmail = req.params.email;
    const authenticatedUserEmail = req.user?.email;

    // Find the user first
    const user = await userService.getUserByEmail(requestedEmail || '');
    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    // Then check for authorization
    if (authenticatedUserEmail !== user.email) {
        return res.status(httpStatus.FORBIDDEN).json({ message: 'Access denied' });
    }

    res.status(httpStatus.OK).json(user);
};
