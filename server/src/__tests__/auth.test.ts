import request from 'supertest';
import httpStatus from 'http-status-codes';
import app from '../app';
import prisma from '../utils/prismaClient';
import { afterEach } from 'node:test';

describe('Auth Routes', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /auth/register', () => {
        const registerPath = '/auth/register';
        const testUser = {
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
        };

        // Clean up the user after the test
        afterEach(async () => {
            await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
        });

        it('should register a new user and return 201', async () => {
            const res = await request(app).post(registerPath).send(testUser);

            expect(res.statusCode).toEqual(httpStatus.CREATED);
            expect(res.body).toHaveProperty('message', 'User registered successfully');
        });

        it('should not register a user with an existing email and return 400', async () => {
            // First, create a user
            await request(app).post(registerPath).send(testUser);

            // Then, try to register with the same email
            const res = await request(app).post(registerPath).send(testUser);

            expect(res.statusCode).toBeGreaterThanOrEqual(httpStatus.BAD_REQUEST); // Should be a client error
        });
    });

    describe('POST /auth/login', () => {
        const loginPath = '/auth/login';
        const testUser = {
            email: 'test-login@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'Login',
        };

        beforeAll(async () => {
            // Create a user to login with
            await request(app).post('/auth/register').send(testUser);
        });

        afterAll(async () => {
            // Clean up the user
            await prisma.user.deleteMany({ where: { email: testUser.email } });
        });

        it('should login an existing user and return a token', async () => {
            const res = await request(app).post(loginPath).send({
                email: testUser.email,
                password: testUser.password,
            });

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('token');
        });

        it('should not login with incorrect password', async () => {
            const res = await request(app).post(loginPath).send({
                email: testUser.email,
                password: 'wrongpassword',
            });

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });

        it('should not login a non-existent user', async () => {
            const res = await request(app).post(loginPath).send({
                email: 'nouser@example.com',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });
    });
});
