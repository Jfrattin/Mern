import { UserController } from "../controller/types/UsersController"
import express, { Request, Response } from "express";

import { LogInfo } from "../utils/logger";

// Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users
usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        
        // Controller Instance to excute method
        const controller: UserController = new  UserController();
        // Obtain Reponse
        const response: any = await controller.getUsers();
        // Send to the client the response
        return res.send(response);
    })

// Export Hello Router
export default usersRouter;