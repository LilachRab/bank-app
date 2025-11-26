import app from './app';
import { config } from './config';
import { createServer } from 'http';
import { initSocket } from './sockets';

const PORT = config.port;

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger documentation at http://localhost:${PORT}/apiDocumentation`);
});
