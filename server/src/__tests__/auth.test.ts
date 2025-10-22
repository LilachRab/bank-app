import request from 'supertest';
import httpStatus from 'http-status-codes';
import app from '../app';
import prisma from '../utils/prismaClient';
import { UserDto } from '../dtos/user.dto';

// Centralized test emails
const TEST_EMAILS = {
    REGISTRATION: 'test@example.com',
    REGISTRATION_2: 'test2@example.com',
    REGISTRATION_3: 'test3@example.com',
    REGISTRATION_4: 'test4@example.com',
    REGISTRATION_5: 'test5@example.com',
    INVALID_FORMAT: 'invalid-email',
    LOGIN: 'test-login@example.com',
    LOGOUT: 'logout-test@example.com',
} as const;

// Get all test emails as an array for cleanup
const ALL_TEST_EMAILS = Object.values(TEST_EMAILS);

describe('Test Auth Routes', () => {
    afterAll(async () => {
        // Clean up all test users
        await prisma.user.deleteMany({
            where: {
                email: {
                    in: ALL_TEST_EMAILS,
                },
            },
        });
        await prisma.$disconnect();
    });

    describe('POST /auth/register', () => {
        const registerPath = '/auth/register';
        const testUser: UserDto = {
            email: TEST_EMAILS.REGISTRATION,
            firstName: 'Test',
            lastName: 'User',
            password: 'password123',
        };

        // Clean up the user after each test
        afterEach(async () => {
            await prisma.user.deleteMany({
                where: {
                    email: {
                        in: ALL_TEST_EMAILS,
                    },
                },
            });
        });

        it('Should register a new user and return CREATED', async () => {
            const res = await request(app).post(registerPath).send(testUser);

            expect(res.statusCode).toEqual(httpStatus.CREATED);
            expect(res.body).toHaveProperty('message', 'User registered successfully');
        });

        it('Should not register a user with an existing email and return BAD_REQUEST', async () => {
            // First, create a user
            await request(app).post(registerPath).send(testUser);

            // Then, try to register with the same email
            const res = await request(app).post(registerPath).send(testUser);

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('already exists');
        });

        it('Should return BAD_REQUEST for missing email in registration', async () => {
            const res = await request(app).post(registerPath).send({
                firstName: 'Test',
                lastName: 'User',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for missing firstName in registration', async () => {
            const res = await request(app).post(registerPath).send({
                email: TEST_EMAILS.REGISTRATION_2,
                lastName: 'User',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for missing lastName in registration', async () => {
            const res = await request(app).post(registerPath).send({
                email: TEST_EMAILS.REGISTRATION_3,
                firstName: 'Test',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for missing password in registration', async () => {
            const res = await request(app).post(registerPath).send({
                email: TEST_EMAILS.REGISTRATION_4,
                firstName: 'Test',
                lastName: 'User',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for empty email in registration', async () => {
            const res = await request(app).post(registerPath).send({
                email: '',
                firstName: 'Test',
                lastName: 'User',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('empty');
        });

        it('Should return BAD_REQUEST for invalid email format in registration', async () => {
            const res = await request(app).post(registerPath).send({
                email: TEST_EMAILS.INVALID_FORMAT,
                firstName: 'Test',
                lastName: 'User',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('Invalid email format');
        });

        it('Should return BAD_REQUEST for short password in registration', async () => {
            const res = await request(app).post(registerPath).send({
                email: TEST_EMAILS.REGISTRATION_5,
                firstName: 'Test',
                lastName: 'User',
                password: '123', // Too short
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('at least 8 characters');
        });
    });

    describe('POST /auth/login', () => {
        const loginPath = '/auth/login';
        const testUser: UserDto = {
            email: TEST_EMAILS.LOGIN,
            firstName: 'Test',
            lastName: 'Login',
            password: 'password123',
        };

        beforeAll(async () => {
            await request(app).post('/auth/register').send(testUser);
        });

        afterAll(async () => {
            await prisma.user.deleteMany({
                where: {
                    email: {
                        in: ALL_TEST_EMAILS,
                    },
                },
            });
        });

        it('Should login an existing user and return a token', async () => {
            const res = await request(app).post(loginPath).send({
                email: testUser.email,
                password: testUser.password,
            });

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('token');
        });

        it('Should not login with incorrect password', async () => {
            const res = await request(app).post(loginPath).send({
                email: testUser.email,
                password: 'wrongpassword',
            });

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });

        it('Should not login a non-existent user', async () => {
            const res = await request(app).post(loginPath).send({
                email: 'nouser@example.com',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        });

        it('Should return BAD_REQUEST for missing email in login', async () => {
            const res = await request(app).post(loginPath).send({
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for missing password in login', async () => {
            const res = await request(app).post(loginPath).send({
                email: testUser.email,
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('required');
        });

        it('Should return BAD_REQUEST for empty email in login', async () => {
            const res = await request(app).post(loginPath).send({
                email: '',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('empty');
        });

        it('Should return BAD_REQUEST for empty password in login', async () => {
            const res = await request(app).post(loginPath).send({
                email: testUser.email,
                password: '',
            });

            expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
            expect(res.body.message).toContain('empty');
        });
    });

    describe('POST /auth/logout', () => {
        let validToken: string;

        beforeAll(async () => {
            // Create a user and get a valid token
            const testUser = {
                email: TEST_EMAILS.LOGOUT,
                firstName: 'Logout',
                lastName: 'Test',
                password: 'password123',
            };

            await request(app).post('/auth/register').send(testUser);
            const loginRes = await request(app).post('/auth/login').send({
                email: testUser.email,
                password: testUser.password,
            });
            validToken = loginRes.body.token;
        });

        afterAll(async () => {
            await prisma.user.deleteMany({
                where: {
                    email: {
                        in: ALL_TEST_EMAILS,
                    },
                },
            });
        });

        it('Should logout successfully with valid token', async () => {
            const res = await request(app).post('/auth/logout').set('Cookie', `token=${validToken}`);

            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body.message).toContain('successfully');
        });
    });
});
