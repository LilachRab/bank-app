import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { authService } from '../services/authService';
import { jwtService } from '../services/jwtService';
import { UserDto, SigninDto } from '../dtos/user.dto';
import { addTokenToBlacklist } from '../services/tokenBlacklistService';

export const signup = async (req: Request, res: Response) => {
    try {
        const userData: UserDto = req.body;
        await authService.signupUser(userData);
        res.status(httpStatus.CREATED).json({ message: 'User signed up successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Signup failed';

        if (errorMessage.includes('already exists')) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: errorMessage });
        }

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
};

export const signin = async (req: Request, res: Response) => {
    const userSigninData: SigninDto = req.body;
    const user = await authService.signinUser(userSigninData);

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

export const signout = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (token) {
        await addTokenToBlacklist(token);
    }

    res.clearCookie('token');
    res.status(httpStatus.OK).json({ message: 'Signed out successfully' });
};
