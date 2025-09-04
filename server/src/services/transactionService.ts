import { Prisma } from '@prisma/client';
import prisma from '../utils/prismaClient';

const createDbTransaction = async (senderEmail: string, receiverEmail: string, amount: number) => {
    return prisma.$transaction(async (prismaTransactionClient: Prisma.TransactionClient) => {
        // 1. Find the receiver
        const receiver = await prismaTransactionClient.user.findUnique({
            where: { email: receiverEmail },
        });

        if (!receiver) {
            throw new Error('Receiver not found.');
        }

        // 2. Check sender's balance
        const sender = await prismaTransactionClient.user.findUnique({
            where: { email: senderEmail },
        });

        if (!sender || sender.balance < amount) {
            throw new Error("You don't have enough money.");
        }

        // 3. Update sender's balance
        await prismaTransactionClient.user.update({
            where: { email: senderEmail },
            data: { balance: { decrement: amount } },
        });

        // 4. Update receiver's balance
        await prismaTransactionClient.user.update({
            where: { email: receiverEmail },
            data: { balance: { increment: amount } },
        });

        // 5. Create the transaction record
        await prismaTransactionClient.transaction.create({
            data: {
                amount,
                senderEmail: senderEmail,
                receiverEmail: receiverEmail,
            },
        });
    });
};

export const transactionService = {
    createDbTransaction,
};
