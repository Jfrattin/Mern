import express, { Request, Response } from "express";
import { AuthController } from "../controller/types/AuthController"
import { LogInfo } from "../utils/logger"; 
//import IUser
import  {IUser}  from "../domain/interfaces/IUser.interfaces";
//Import Bcrypt 
import bcrypt from "bcrypt"
import { IAuth } from "../domain/interfaces/IAuth.interfaces";
//Router from express
let authRouter=express.Router();
//Register
authRouter.route('/auth/register')
.post(async (req: Request, res: Response) => {
    
    let {name, email, password,age}= req.body;
    let  hashedPassword = '';
    if(req.body.password && req.body.name &&req.body.email && req.body.age){
        
       // let name = req.body.name;
        //let email = req.body.email;
        //obtain  the password in request
        //Encripter password 
        hashedPassword = bcrypt.hashSync(req.body.password, 8);
       //    let age = req.body.age;
       //create User password cifrate
       let newuser: IUser = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    age: age}
       
       const controller: AuthController = new AuthController();

       // Obtain Reponse
       let response: any = await controller.RegisterUser(newuser);  
        // Send to the client the response
        return res.status(201).send(response);    
    }


    
    


} )

//Login
authRouter.route('/auth/login')
.post(async (req: Request, res: Response) => {
    
    let {email, password}= req.body;
    if(email && password ){
        
        //TODO
       const controller: AuthController = new AuthController();

       let Auth : IAuth = {
        email: email,
        password:  password
       }
       // Obtain Reponse
       let response: any = await controller.LoginUser(Auth);  
        // Send to the client the response
        return res.status(201).send(response);    
    }


    
    


} )

export default authRouter