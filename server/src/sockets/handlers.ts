import { Socket } from 'socket.io';

export const registerSocketHandlers = (socket: Socket) => {
    const userEmail = socket.data.userEmail;

    socket.join(userEmail);
};
