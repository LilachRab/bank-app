import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { userService } from '../services/userService';
import { User } from '../models/user';

interface AuthRequest extends Request {
    user?: User;
}

export const getUser = async (req: AuthRequest, res: Response) => {
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
