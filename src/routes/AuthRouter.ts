import express, { Request, Response } from "express";
import { AuthController } from "../controller/types/AuthController"
import { LogInfo } from "../utils/logger"; 
//import IUser
import  {IUser}  from "../domain/interfaces/IUser.interfaces";
//Import Bcrypt 
import bcrypt from "bcrypt"



import { IAuth } from "../domain/interfaces/IAuth.interfaces";

//import body parser  (Read json body in request)
import bodyParser from "body-parser";
import { verifyToken } from "../middlewares/verify.middlewares";


//Router from express
let authRouter=express.Router();

//Middleware to read json request body
let jsonParser = bodyParser.json();

//Register
authRouter.route('/register')
.post(jsonParser, async (req: Request, res: Response) => {
    
    let {name, email, password, age } = req?.body
    let  hashedPassword = '';

    if(name && password && email && age){
        hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let newuser: IUser = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    age: age,
                    katas: []}
       
       const controller: AuthController = new AuthController();

       // Obtain Reponse
       let response: any = await controller.RegisterUser(newuser);  
        // Send to the client the response
        return res.status(200).send(response);    
    }
    else{ 
        
        return res.status(400).send(`[ERROR] User  data missing: Can user register `)}


    
    


} )

//Login
authRouter.route('/login')
.post(jsonParser,async (req: Request, res: Response) => {
    let {email, password}= req?.body;
    if(email && password ){
        
       const controller: AuthController = new AuthController();

       let auth : IAuth = {
        email: email,
        password:  password
       }
       // Obtain Reponse
       const response: any = await controller.LoginUser(auth);  
        // Send to the client the response
        return res.status(201).send(response);    
    }
    else{ 
        return res.status(400).send(`[ERROR] User  data missing: Can user Loggin `)}
} )

//Route protected with JWT
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res: Response)=>{
        let id : any = req?.query?.id;

        if(id){
            //Controller: Auth controller
            const controller: AuthController = new AuthController();
            //obtain Response
            let response: any = await controller.userData(id);
            //if User it is authorised
            return res.status(200).send(response);
        }
        else{
            return res.status(401).send({
                message: 'you are not authorised '
            })
        }

    })



export default authRouter