import { UserController } from "../controller/types/UsersController"
import express, { Request, Response } from "express";

import { LogInfo } from "../utils/logger";

// Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=63d83e5e2bfab67c7cab9186

usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to excute method
        const controller: UserController = new  UserController();
        // Obtain Reponse
        const response: any = await controller.getUsers(id);
        // Send to the client the response
        return res.send(response);
    })

    .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        const controller: UserController = new  UserController();
        // Obtain Reponse
        const response: any = await controller.deleteUser(id);
        // Send to the client the response
        return res.send(response);

    })

    .post(async (req: Request, res: Response) => {
        const controller: UserController = new  UserController();
        // Obtain Reponse
        let user = {
            name: "tino",
            email: "tino@gmail.com",
            age: "52"
        }
        let user1 = {
            name: "tinos",
            email: "tinos@gmail.com",
            age: "52"
        }
        let user2 = {
            name: "tino",
            email: "tino@gmail.com",
            age: "52"
        }
        let user3 = {
            name: "tinu",
            email: "tinu@gmail.com",
            age: "52"
        }
        let user4 = {
            name: "tine",
            email: "tine@gmail.com",
            age: "52"
        }
        let user5 = {
            name: "tini",
            email: "tini@gmail.com",
            age: "52"
        }
        let response: any = await controller.createUser(user5);
       
        // Send to the client the response
        return res.send(response);

    })
// Export uers Router
export default usersRouter;