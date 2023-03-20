import { UserController } from "../controller/types/UsersController"
import express, { query, Request, Response } from "express";
import { verifyToken } from "../middlewares/verify.middlewares";
import { LogInfo } from "../utils/logger";
//import body parser
import bodyParser from "body-parser";
//import Katalevel y Kata
import { Katalevel, IKata } from "../domain/interfaces/Ikatas.interfaces";
import { ObjectId } from "mongoose";

//Router from express
let authRouter=express.Router();

//Middleware to read json request body
let jsonParser = bodyParser.json();


// Router from express
let katasRouter = express.Router();

// http://localhost:8000/api/users?id=63d83e5e2bfab67c7cab9186
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

    .delete(verifyToken,async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        const controller: UserController = new  UserController();
        // Obtain Reponse
        let response: any = await controller.deleteUser(id);
        // Send to the client the response
        return res.status(204).send(response);

    })
    
    .put(verifyToken, async (req: Request, res: Response) => {
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

    .post(verifyToken,jsonParser,async (req: Request, res: Response) => {
        //Obain ID for Querry
        let id: string = req?.body?.id || "Error" ;
        // Obtain a body Params
        let name: string = req?.body?.name || '';
        let description: string = req?.body?.description|| '';
        let level: Katalevel = req?.body?.level|| Katalevel.BASIC;
        let intents:number = req?.body?.intents || 1;
        let stars: number = req?.body?.stars|| 1;
        let solution: string = req?.body?.solution || 'Default Solution';
        let participants: string[] = req?.body.participants || [];
       
       let sentkata:IKata = {
           name: name,
           description: description,
           level:level,
           intents:intents,
           stars:stars,
           creator:id,
           solution:solution,
           participants:participants,
              } 
       //console.log("kata:", sentkata) 

       if(name && description && level && intents>=0 && stars>=0 && id && solution && participants.length>=0){
          //controler instances to excute method
          const controller: UserController = new  UserController(); 

           //Creating katas default
           
           // Obtain Reponse
           const response: any = await controller.createKata(sentkata)
           return res.status(201).send(response);
           }    
           
           else{
           return res.status(400).send({
               message:'[ERROR] Creating Kata. You need  to send all atributes of katas to create it'
           })
       }
   
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


    usersRouter.route('/value')
    .post(verifyToken,jsonParser, async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.body?.id;
        let value: any = req?.body?.value;

        // Controller Instance to excute method
        const controller: UserController = new UserController();
        // Obtain Reponse
        const response: any = await controller.valuekatas({ id, value })
        // Send to the client the response
        return res.status(200).send(response);

    });

    export default usersRouter

