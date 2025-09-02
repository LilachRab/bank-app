import express from 'express';
import { createAuthRouter } from './authRouter';
import { createApiRouter } from './apiRouter';

export const routes = express.Router();

routes.use('/api', createApiRouter());
routes.use('/auth', createAuthRouter());
