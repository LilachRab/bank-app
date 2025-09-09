import dotenv from 'dotenv';

dotenv.config();

const getEnvironmentVariables = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const config = {
    databaseUrl: getEnvironmentVariables('DATABASE_URL'),
    jwtSecret: getEnvironmentVariables('JWT_SECRET'),
    jwtExpiration: getEnvironmentVariables('JWT_EXPIRATION'),
    port: process.env.PORT || '3000',
};
