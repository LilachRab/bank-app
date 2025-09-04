import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import prisma from '../utils/prismaClient';
import { jwtService } from '../services/jwtService';

interface AuthRequest extends Request {
    user?: any;
}

export const protectByToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            const token = req.headers.authorization.split(' ')[1] || '';

            // Verify token
            const decodedToken = jwtService.verifyToken(token);
            if (!decodedToken) {
                return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized, token failed' });
            }

            // Get user from the token
            req.user = await prisma.user.findUnique({ where: { email: decodedToken.email } });

            next();
        } catch (error) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!req.headers.authorization) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized, no token' });
    }
};
