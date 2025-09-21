import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { setupSwagger } from './swagger';
import { routes } from './routes';
import errorHandler from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);
app.use(errorHandler);
setupSwagger(app);

export default app;
