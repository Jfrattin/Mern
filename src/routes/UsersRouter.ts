import { UserController } from "../controller/types/UsersController"
import express, { Request, Response } from "express";

import { LogInfo } from "../utils/logger";



//import Bcrypt for password

import bcrypt from 'bcrypt';

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

    .post(async (req: Request, res: Response) => {
        let nameq: any = req?.query?.name;
        let emailq: any = req?.query?.email;
        let ageq: any = req?.query?.age;
        

        /* let nameb: any = req?.body?.name;

        LogInfo(`### name is body: ${nameb}`); */

        let user = {
              name: nameq|| "default mail",
                email: emailq || "default email", 
                age: ageq|| 18 }
          
        const controller: UserController = new  UserController();
        // Obtain Reponse
        let response: any = await controller.createUser(user);
        // Send to the client the response
        return res.status(201).send(response);

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

