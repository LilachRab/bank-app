import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middleware/errorMiddleware';
import { routes } from './routes';
import { setupSwagger } from './swagger';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173', // Vite default port
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);
app.use(errorHandler);
setupSwagger(app);

export default app;
