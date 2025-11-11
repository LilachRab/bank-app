import request from 'supertest';
import httpStatus from 'http-status-codes';
import app from '../app';
import prisma from '../utils/prismaClient';
import { jwtService } from '../services/jwtService';
import bcrypt from 'bcryptjs';

describe('Test API Routes', () => {
    let senderToken: string;
    let senderEmail = 'sender@example.com';
    let receiverEmail = 'receiver@example.com';

    beforeAll(async () => {
        // Hash passwords before creating users
        const hashedPassword = await bcrypt.hash('password', 10);

        // Create sender and receiver users
        await prisma.user.createMany({
            data: [
                { email: senderEmail, password: hashedPassword, firstName: 'Sender', lastName: 'User', balance: 1000 },
                {
                    email: receiverEmail,
                    password: hashedPassword,
                    firstName: 'Receiver',
                    lastName: 'User',
                    balance: 500,
                },
            ],
        });
        // Generate a token for the sender
        senderToken = jwtService.generateToken(senderEmail);
    });

    afterAll(async () => {
        // Clean up users and transactions
        await prisma.transaction.deleteMany({});
        await prisma.user.deleteMany({ where: { email: { in: [senderEmail, receiverEmail] } } });
        await prisma.$disconnect();
    });

    describe('GET /api/users/me', () => {
        it('Should get the authenticated user', async () => {
            const res = await request(app).get('/api/users/me').set('Cookie', `token=${senderToken}`);

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('email', senderEmail);
            expect(res.body).not.toHaveProperty('password');
        });

        it('Should return httpStatus.UNAUTHORIZED for a non-authenticated request', async () => {
            const res = await request(app).get('/api/users/me');

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });
    });

    describe('POST /api/transactions/create', () => {
        it('Should create a transaction with a valid token', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: 100,
            });

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('message', 'Transaction created successfully');
        });

        it('Should return UNAUTHORIZED for a transaction without a token', async () => {
            const res = await request(app).post('/api/transactions/create').send({
                receiverEmail: receiverEmail,
                transactionAmount: 100,
            });

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });

        it('Should return BAD_REQUEST when trying to send money to yourself', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: senderEmail, // Same as sender
                transactionAmount: 100,
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('yourself');
        });

        it('Should return BAD_REQUEST when trying to send more money than available', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: 2000, // More than sender's balance (1000)
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('enough money');
        });

        it('Should return NOT_FOUND when trying to send to non-existent user', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: 'nonexistent@example.com',
                transactionAmount: 100,
            });

            expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
            expect(res.body.message).toContain('not found');
        });

        it('Should return BAD_REQUEST for invalid transaction data (missing receiverEmail)', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                transactionAmount: 100,
                // Missing receiverEmail
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for invalid transaction data (missing transactionAmount)', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                // Missing transactionAmount
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for negative transaction amount', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: -100,
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('greater than 0');
        });

        it('Should return BAD_REQUEST for zero transaction amount', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: 0,
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('greater than 0');
        });

        it('Should return BAD_REQUEST for invalid email format', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: 'invalid-email',
                transactionAmount: 100,
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('Invalid receiver email format');
        });

        it('Should create a transaction with decimal amount (1 decimal place)', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: 10.5,
            });

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('message', 'Transaction created successfully');
        });

        it('Should create a transaction with decimal amount (2 decimal places)', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: 25.99,
            });

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('message', 'Transaction created successfully');
        });

        it('Should return BAD_REQUEST for more than 2 decimal places', async () => {
            const res = await request(app).post('/api/transactions/create').set('Cookie', `token=${senderToken}`).send({
                receiverEmail: receiverEmail,
                transactionAmount: 10.123,
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('more than 2 decimal places');
        });
    });

    describe('GET /api/transactions', () => {
        it('Should return OK for transactions with valid authentication', async () => {
            const res = await request(app).get('/api/transactions').set('Cookie', `token=${senderToken}`);

            expect(res.statusCode).toEqual(httpStatus.OK);
        });

        it('Should return UNAUTHORIZED for unauthenticated request', async () => {
            const res = await request(app).get('/api/transactions');

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });

        it('Should return UNAUTHORIZED for invalid token', async () => {
            const res = await request(app).get('/api/transactions').set('Cookie', 'token=invalid-token');

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });
    });
});
