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
        return res.status(200).send(response);
    })

    .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        const controller: UserController = new  UserController();
        // Obtain Reponse
        let response: any = await controller.deleteUser(id);
        // Send to the client the response
        return res.status(204).send(response);

    })
    
    .put(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        let nameq: any = req?.query?.name;
        let emailq: any = req?.query?.email;
        let ageq: any = req?.query?.age;
        //Creating user default
        let user = {
                name: nameq|| "default mail",
              email: emailq || "default email", 
              age: ageq|| 18 }
        LogInfo(`Query Param: ${id}`);
        const controller: UserController = new  UserController();
        // Obtain Reponse
        let response: any = await controller.updateUser(id,user);
        // Send to the client the response
        
        return res.status(200).send(response);

    })

    export default usersRouter

