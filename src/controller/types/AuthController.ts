import {Get, Query, Route, Tags, Delete, Post, Put} from "tsoa";
import { IAuthcontroller} from "../interfaces";
import { LogSuccess, LogError, LogWarning } from "../../utils/logger";
import { IUser } from "../../domain/interfaces/IUser.interfaces"; 
import { IAuth } from "../../domain/interfaces/IAuth.interfaces";
//import ORM
import { registerUser, LoginUser, logoutUser, getUsersByID,getAllUsers} from "../../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./index";


@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthcontroller{
  
    @Post("/register")
    public async RegisterUser(user: IUser): Promise<any> {
    let response: any="no funcion"
      
      if(user){
          LogSuccess( `[api/users] Register User ` );
          
          response = await  registerUser(user).then((r)=>{
            LogSuccess('[api/auth/register] Create user');
       
          })
          response = { message: `User created: ${user.name}`};
          }else{
          LogWarning('[api/auth/register] Register needs user Entity');
          response = {message : "Please, provide a User Entity"}   
        }
           return response
     }

     @Post("/login")
     public async LoginUser(auth: IAuth): Promise<any> {
 
         let response: AuthResponse | ErrorResponse | undefined;
 
         if(auth){
             LogSuccess(`[/api/auth/register] Login with User: ${auth.email} `);
             
             let data = await LoginUser(auth);
                     response = { token: data.token,
                     message: `Welcome ${data.user.name}`
                        }
             }else {
             LogWarning('[/api/auth/login] Register needs Auth Entity (email && password')
             response = {
                 token: '[AUTH ERROR]: Email & Password are needed',
                 message: 'Please, provide a email && password to login'
             }
         }
 
         return response;
 
     }
 
  
    @Post("/logout")     
    public async logoutUser(): Promise<any> {
    //TODO Authenticate user and return JWT
    throw new Error("Method not implemented.");
    }
}
