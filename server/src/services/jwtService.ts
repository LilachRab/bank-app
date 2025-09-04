import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const generateToken = (payload: object): string => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiration,
    });
};

const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: any = jwt.verify(token, config.jwtSecret);
        return decoded.exp < Date.now() / 1000;
    } catch (error) {
        return true;
    }
};

export const jwtService = {
    generateToken,
    verifyToken,
    isTokenExpired,
};
