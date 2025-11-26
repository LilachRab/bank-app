import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        message,
    });
};
