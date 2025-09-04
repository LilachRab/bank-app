import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { userService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
    const { userName } = req.params;
    const user = await userService.getUserByEmail(userName || '');
    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    res.status(httpStatus.OK).json(user);
};
