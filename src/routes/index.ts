/*
*Root Router
*Redirection to Routers
*/ 

import express, {Request, Response} from "express";
import HelloRouter from "./HelloRouter";
import { LogInfo} from "../utils/logger";
import GoodbyeRouter from "./GoodbyeRouter";

//* server instance
let server = express();

//Router instance 
let rootRouter = express.Router();

//get: http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api');
    
    res.send('welcome a mi API Restfull: Express + TS + Nodemon + Jest + Swagger + Mongoose');
});

//Redirection routes and controllers 
server.use('/', rootRouter);  //http://localhost:8000/api/
server.use('/hello', HelloRouter); //http://localhost:8000/api/hello --> helloRouter 
server.use('/goodbye', GoodbyeRouter); //http://localhost:8000/api/goodbye --> goodbyeRouter 

export default server;