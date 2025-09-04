import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { authService } from '../services/authService';
import { jwtService } from '../services/jwtService';

export const register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    await authService.registerUser({ email, password, firstName, lastName });
    res.status(httpStatus.CREATED).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.loginUser({ email, password });

    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const token = jwtService.generateToken({ email: user.email });
    res.status(httpStatus.OK).json({ token });
};
