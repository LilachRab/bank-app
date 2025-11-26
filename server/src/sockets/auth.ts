import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { config } from '../config';

export const socketAuthMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication token missing'));
        }

        const decoded: any = jwt.verify(token, config.jwtSecret);

        socket.data.userEmail = decoded.email;
        next();
    } catch (err) {
        next(new Error('Socket authentication failed'));
    }
};
