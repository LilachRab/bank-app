import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { authService } from '../services/authService';
import { jwtService } from '../services/jwtService';
import { UserDto, LoginDto } from '../dtos/user.dto';

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
    res.status(httpStatus.OK).json({ token });
};
