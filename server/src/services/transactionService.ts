import { Prisma } from '@prisma/client';
import prisma from '../utils/prismaClient';
import { TransactionInput } from '../models/transaction';
import { UserDetailsWithoutPassword } from '../models/user';

const insertTransaction = async (sender: UserDetailsWithoutPassword, transactionData: TransactionInput) => {
    const { receiverEmail, transactionAmount } = transactionData;

    // Validation checks
    if (sender.email === receiverEmail) {
        throw new Error('You cannot send money to yourself');
    }

    return prisma.$transaction(async (prismaTransactionClient: Prisma.TransactionClient) => {
        // 1. Find the receiver
        const receiver = await prismaTransactionClient.user.findUnique({
            where: { email: receiverEmail },
        });

        if (!receiver) {
            throw new Error('Receiver not found');
        }

        // 2. Check sender's balance
        if (sender.balance < transactionAmount) {
            throw new Error("You don't have enough money");
        }

        // 3. Update sender's balance
        await prismaTransactionClient.user.update({
            where: { email: sender.email },
            data: { balance: { decrement: transactionAmount } },
        });

        // 4. Update receiver's balance
        await prismaTransactionClient.user.update({
            where: { email: receiverEmail },
            data: { balance: { increment: transactionAmount } },
        });

        // 5. Create the transaction record
        await prismaTransactionClient.transaction.create({
            data: {
                amount: transactionAmount,
                senderEmail: sender.email,
                receiverEmail: receiverEmail,
            },
        });
    });
};

const getUserTransactions = async (authenticatedUserEmail: string) => {
    return prisma.transaction.findMany({
        where: {
            OR: [{ senderEmail: authenticatedUserEmail }, { receiverEmail: authenticatedUserEmail }],
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const transactionService = {
    insertTransaction,
    getUserTransactions,
};
