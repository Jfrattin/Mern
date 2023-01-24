import dotenv from 'dotenv';
import server from './src/server';
import { LogError, LogSuccess } from './src/utils/logger';

//*config .env files 
dotenv.config();

const port = process.env.PORT || 8000;

//* Execute Server

server.listen(port, () => {
    LogSuccess( `[SERVER ON]: Server Running http://localhost:${port}/api`);
});

server.on('error', (error) => {
    LogError(`[server ERROR] : `);
});