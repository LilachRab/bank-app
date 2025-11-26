import http from 'http';
import { Server } from 'socket.io';
import { socketAuthMiddleware } from './auth';
import { registerSocketHandlers } from './handlers';

let io: Server;

export const initSocket = (httpServer: http.Server) => {
    io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
            methods: ['GET', 'POST'],
        },
    });

    io.use(socketAuthMiddleware);
    io.on('connection', registerSocketHandlers);

    return io;
};

export const getIO = () => {
    if (!io) throw new Error('Socket.io not initialized yet');
    return io;
};
