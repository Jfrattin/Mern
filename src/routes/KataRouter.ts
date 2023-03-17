
import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/verify.middlewares";
import { LogInfo } from "../utils/logger";

//impor kata levels from interface
import { Katalevel } from "../domain/interfaces/Ikatas.interfaces";
import { IKata } from "../domain/interfaces/Ikatas.interfaces";
import { KatasController } from "../controller/types/KatasController";
//import body parser  (Read json body in request)
import bodyParser from "body-parser";
import { ObjectId } from "mongoose";



//Router from express
let authRouter=express.Router();

//Middleware to read json request body
let jsonParser = bodyParser.json();


// Router from express
let katasRouter = express.Router();

// http://localhost:8000/api/users?id=63d83e5e2bfab67c7cab9186

katasRouter.route('/')
    // GET:
    .get(verifyToken,async (req: Request, res: Response) => {
        // Obtain a Query Param
        let  id: any = req?.query?.id;
        //Pagination Query Param
        let  page: any = req?.query?.page || 1;
        let  limit: any = req?.query?.limit || 5;
        let atribute: any =req?.query?.atribute;

        LogInfo(`Query Param: ${id}`);
        // Controller Instance to excute method
        const controller: KatasController = new  KatasController();
        // Obtain Reponse
        const response: any = await controller.getKatas(page,limit,id,atribute);
        // Send to the client the response
        return res.status(200).send(response);
    })

    .delete(verifyToken,async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        const controller: KatasController = new KatasController();
        // Obtain Reponse
        let response: any = await controller.deleteKata(id);
        // Send to the client the response
        return res.status(204).send(response);

    })
    
    .put(verifyToken,jsonParser,async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
         // Obtain a body Params
         let name: string = req?.body?.name || '';
         let description: string = req?.body?.description|| '';
         let level: Katalevel = req?.body?.level|| Katalevel.BASIC;
         let intents:number = req?.body?.intents || 1;
         let stars: number = req?.body?.stars|| 1;
         let creator: string = req?.body?.creator || 'default Creator';
         let solution: string = req?.body?.solution || 'Default Solution';
         let participants: string[] = req?.body.participants || [];


         let sentkata:IKata = {
            name: name,
            description: description,
            level:level,
            intents:intents,
            stars:stars,
            creator:  creator,
            solution: solution,
            participants:participants,
               } 

         console.log("kata:", sentkata) 

         if(name && description && level && intents>=0 && stars>=0 && creator && solution && participants.length>=0){

           //controler instances to excute method
           const controller:  KatasController  = new   KatasController (); 
           
      
            //Creating katas default
            
       
            // Obtain Reponse
            const response: any = await controller.updateKata(id,sentkata);
            // Send to the client the response
            return res.status(200).send(response);
            }    
           
            else{
            return res.status(400).send({
                message:'[ERROR] Updating Kata. You need  to send all atributes of katas to update it'
            })
        }
    
    })

    .post(verifyToken,jsonParser,async (req: Request, res: Response) => {
  
         // Obtain a body Params
        let name: string = req?.body?.name || '';
        let description: string = req?.body?.description|| '';
        let level: Katalevel = req?.body?.level|| Katalevel.BASIC;
        let intents:number = req?.body?.intents || 1;
        let stars: number = req?.body?.stars|| 1;
        let creator: string= req?.body?.creator || 'default Creator';
        let solution: string = req?.body?.solution || 'Default Solution';
        let participants: string[] = req?.body.participants || [];
        
        let sentkata:IKata = {
            name: name,
            description: description,
            level:level,
            intents:intents,
            stars:stars,
            creator:  creator,
            solution: solution,
            participants:participants,
               } 
        console.log("kata:", sentkata) 

        if(name && description && level && intents>=0 && stars>=0 && creator && solution && participants.length>=0){
           //controler instances to excute method
           const controller:  KatasController  = new   KatasController (); 
           
           let kata:IKata = {
                name: name,
                description: description,
                level:level,
                intents:intents,
                stars:stars,
                creator:  creator,
                solution: solution,
                participants:participants,
                   }     
            //Creating katas default
            
       
            // Obtain Reponse
            const response: any = await controller.createKata(kata)
            return res.status(201).send(response);
            }    
            
            else{
            return res.status(400).send({
                message:'[ERROR] Creating Kata. You need  to send all atributes of katas to create it'
            })
        }
    
    })
    export default katasRouter

