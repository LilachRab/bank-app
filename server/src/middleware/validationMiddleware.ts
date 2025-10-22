import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { email, firstName, lastName, password } = req.body;

    // Check for missing required fields (undefined or null)
    if (email === undefined || firstName === undefined || lastName === undefined || password === undefined) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'All fields (email, firstName, lastName, password) are required',
        });
    }

    // Check for empty strings
    if (email.trim() === '' || firstName.trim() === '' || lastName.trim() === '' || password.trim() === '') {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'All fields must not be empty',
        });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Invalid email format',
        });
    }

    // Password length validation
    if (password.length < 8) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Password must be at least 8 characters long',
        });
    }

    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check for missing required fields (undefined or null)
    if (email === undefined || password === undefined) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Email and password are required',
        });
    }

    // Check for empty strings
    if (email.trim() === '' || password.trim() === '') {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Email and password must not be empty',
        });
    }

    next();
};

export const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { receiverEmail, transactionAmount } = req.body;

    // Check for missing required fields
    if (!receiverEmail || transactionAmount === undefined) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'receiverEmail and transactionAmount are required',
        });
    }

    // Check for empty receiver email
    if (receiverEmail.trim() === '') {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Receiver email must not be empty',
        });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(receiverEmail)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Invalid receiver email format',
        });
    }

    // Validate transaction amount
    if (typeof transactionAmount !== 'number' || isNaN(transactionAmount)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Transaction amount must be a valid number',
        });
    }

    if (transactionAmount <= 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Transaction amount must be greater than 0',
        });
    }

    next();
};
