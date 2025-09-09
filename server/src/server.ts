import app from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger documentation at http://localhost:${PORT}/apiDocumentation`);
});
