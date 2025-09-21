import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { authService } from '../services/authService';
import { jwtService } from '../services/jwtService';
import { UserDto, LoginDto } from '../dtos/user.dto';
import { addTokenToBlacklist } from '../services/tokenBlacklistService';

export const register = async (req: Request, res: Response) => {
    const userData: UserDto = req.body;
    await authService.registerUser(userData);
    res.status(httpStatus.CREATED).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
    const userLoginData: LoginDto = req.body;
    const user = await authService.loginUser(userLoginData);

    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const token = jwtService.generateToken(user.email);

    res.cookie('token', token, {
        httpOnly: true, // cannot be accessed by JS
        secure: true, // only over HTTPS
        sameSite: 'strict', // CSRF protection
    });
    res.status(httpStatus.OK).json({ token });
};

export const logout = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (token) {
        await addTokenToBlacklist(token);
    }

    res.clearCookie('token');
    res.status(httpStatus.OK).json({ message: 'Logged out successfully' });
};

export const me = async (req: Request, res: Response) => {
    // req.user is populated by the protectByToken middleware
    res.status(httpStatus.OK).json(req.user);
};
