import {Get, Query, Route, Tags, Delete, Post, Put} from "tsoa";
import { IAuthcontroller} from "../interfaces";
import { LogSuccess, LogError, LogWarning } from "../../utils/logger";
import { IUser } from "../../domain/interfaces/IUser.interfaces"; 
import { IAuth } from "../../domain/interfaces/IAuth.interfaces";
//import ORM
import { registerUser, loginUser, logoutUser, getUsersByID,getAllUsers} from "../../domain/orm/User.orm";




@Route("/api/users")

@Tags("AuthController")
export class AuthController implements IAuthcontroller{
  
    @Post("/register")
    public async RegisterUser(user: IUser): Promise<any> {
    let response: any=""
      if(user){
          LogSuccess( `[api/users] Register User ` );
          response = await  registerUser(user).then((r)=>{
            LogSuccess('[api/auth/register] Create user');
            response = { message: `User created: ${user.name}`};
          })
          }else{
          LogWarning('[api/auth/register] Register needs user Entity');
          response = {message : "Please, provide a User Entity"}   
        }
           return response
     }

    @Post("/login")
     public async LoginUser(auth: IAuth): Promise<any> {
        let response: any=''    
        if(auth){
            
            response = await  loginUser(auth).then((r)=>{
            LogSuccess('[api/auth/login] Logged  needs user');
            response = { message: `Log Successfully ${auth.email}`,
                          token: r.token} //jwt token generated for user
          });}else{
          LogWarning ('[api/auth/login] Register needs Auth Entity (Email && Password');
          response = {message : "Please, provide a User Entity"} 

        }
        
    }
  
    @Post("/logout")     
    public async logoutUser(): Promise<any> {
    //TODO Authenticate user and return JWT
    throw new Error("Method not implemented.");
    }
}
