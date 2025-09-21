import bcrypt from 'bcryptjs';
import prisma from '../utils/prismaClient';
import { User } from '../models/user';
import { userService } from './userService';
import { UserDto } from '../dtos/user.dto';

const registerUser = async (userData: UserDto) => {
    return userService.insertUser(userData);
};

const loginUser = async (credentials: Pick<User, 'email' | 'password'>) => {
    const user = await prisma.user.findUnique({ where: { email: credentials.email } });
    if (!user || !credentials.password) {
        return null;
    }

    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordMatch) {
        return null;
    }

    return user;
};

export const authService = {
    registerUser,
    loginUser,
};
