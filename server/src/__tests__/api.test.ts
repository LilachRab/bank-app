import request from 'supertest';
import httpStatus from 'http-status-codes';
import app from '../app';
import prisma from '../utils/prismaClient';
import { jwtService } from '../services/jwtService';

describe('Test API Routes', () => {
    let senderToken: string;
    let senderEmail = 'sender@example.com';
    let receiverEmail = 'receiver@example.com';

    beforeAll(async () => {
        // Create sender and receiver users
        await prisma.user.createMany({
            data: [
                { email: senderEmail, password: 'password', firstName: 'Sender', lastName: 'User', balance: 1000 },
                { email: receiverEmail, password: 'password', firstName: 'Receiver', lastName: 'User', balance: 500 },
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

    describe('GET /api/users/:userName', () => {
        it('Should get the authenticated user by email', async () => {
            const res = await request(app)
                .get(`/api/users/${senderEmail}`)
                .set('Authorization', `Bearer ${senderToken}`);

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('email', senderEmail);
            expect(res.body).not.toHaveProperty('password');
        });

        it("Should return 403 when trying to get another user's data", async () => {
            const res = await request(app)
                .get(`/api/users/${receiverEmail}`) // Requesting receiver's data
                .set('Authorization', `Bearer ${senderToken}`); // Using sender's token

            expect(res.statusCode).toEqual(httpStatus.FORBIDDEN);
        });

        it('Should return 401 for a non-authenticated request', async () => {
            const res = await request(app).get(`/api/users/${senderEmail}`);

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });

        it('Should return 404 for a non-existent user', async () => {
            const res = await request(app)
                .get('/api/users/nonexistentuser@example.com')
                .set('Authorization', `Bearer ${jwtService.generateToken('nonexistentuser@example.com')}`);

            expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
        });
    });

    describe('POST /api/transactions/create', () => {
        it('Should create a transaction with a valid token', async () => {
            const res = await request(app)
                .post('/api/transactions/create')
                .set('Authorization', `Bearer ${senderToken}`)
                .send({
                    receiverEmail: receiverEmail,
                    transactionAmount: 100,
                });

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('message', 'Transaction created successfully');
        });

        it('Should return 401 for a transaction without a token', async () => {
            const res = await request(app).post('/api/transactions/create').send({
                receiverEmail: receiverEmail,
                transactionAmount: 100,
            });

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });
    });
});
