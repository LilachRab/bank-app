import prisma from '../utils/prismaClient';
import { UserDto } from '../dtos/user.dto';
import bcrypt from 'bcryptjs';
import { BALANCE_MAX, BALANCE_MIN } from '../constants';
import { UserDetailsWithoutPassword } from '../models/user';

const getUserByEmail = async (email: string): Promise<UserDetailsWithoutPassword | null> => {
    return prisma.user.findUnique({
        where: { email },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            balance: true,
        },
    });
};

const insertUser = async (userData: UserDto) => {
    const isUserExists = await prisma.user.findUnique({ where: { email: userData.email } });

    if (isUserExists) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const initialBalance = Math.floor(Math.random() * (BALANCE_MAX - BALANCE_MIN + 1)) + BALANCE_MIN;

    return prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword,
            balance: initialBalance,
        },
    });
};

export const userService = {
    getUserByEmail,
    insertUser,
};
