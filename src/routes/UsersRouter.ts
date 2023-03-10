import { UserController } from "../controller/types/UsersController"
import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/verify.middlewares";
import { LogInfo } from "../utils/logger";


// Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=63d83e5e2bfab67c7cab9186

usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let  id: any = req?.query?.id;
        //Pagination Query Param
        let  page: any = req?.query?.page || 1;
        let  limit: any = req?.query?.limit || 5;

        LogInfo(`Query Param: ${id}`);
        // Controller Instance to excute method
        const controller: UserController = new  UserController();
        // Obtain Reponse
        const response: any = await controller.getUsers(page,limit,id);
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


    usersRouter.route('/katas')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;

        // Pagination
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        // Controller Instance to excute method
        const controller: UserController = new UserController();
        // Obtain Reponse
        const response: any = await controller.getKatas(page, limit, id)
        // Send to the client the response
        return res.status(200).send(response);

    });



    export default usersRouter

