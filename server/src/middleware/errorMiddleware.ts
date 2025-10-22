import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
    err.statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    err.message = err.message || 'Something went wrong';

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
