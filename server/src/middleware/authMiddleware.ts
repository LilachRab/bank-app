import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted, removeTokenFromBlacklist } from '../services/tokenBlacklistService';
import { jwtService } from '../services/jwtService';
import httpStatus from 'http-status-codes';
import prisma from '../utils/prismaClient';

export const protectByToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized, no token provided' });
    }

    if (await isTokenBlacklisted(token)) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    }

    try {
        const decodedToken = jwtService.verifyToken(token);
        if (!decodedToken) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized, token failed' });
        }

        const user = await prisma.user.findUnique({ where: { email: decodedToken.email } });
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'User not found' });
        }
        req.user = user;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            await removeTokenFromBlacklist(token);
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token expired' });
        }
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
};
