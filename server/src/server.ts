import express from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger';
import { routes } from './routes';

const PORT = process.env.PORT || 3000;
const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);
setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger documentation at http://localhost:${PORT}/apiDocumentation`);
});
