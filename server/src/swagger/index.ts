import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bank Application REST API',
            version: '1.0.0',
            description:
                'API documentation for **BankApp**.\n\nBuilt using Typescript, Node, React, Express, PostgreSQL.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    tags: [
        {
            name: 'Auth',
            description: 'Authentication related endpoints',
        },
        {
            name: 'Transactions',
            description: 'Bank transaction endpoints',
        },
        {
            name: 'Users',
            description: 'User management endpoints',
        },
    ],
    apis: ['./src/routes/*ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
    app.use('/apiDocumentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
