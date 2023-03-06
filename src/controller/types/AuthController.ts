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
 /**
  * Endpoint te retreive the User in the collection "User"
  * middleware: Validate JWT
  * in your headers yoy must add the  X-acces-token wiht jwt valid
  * @param {String}id  ID user to retreive 
  * 
  * @returns User found  ID params
  */



    @Get("/me")
   public async userData(@Query()id?: string): Promise<any> { 
      
      let response: any = '';

      //si existe el ID como @query devuelvo solo ese user
      if(id){
        LogSuccess( `[api/users] Get User Data by ID: ${id} ` );
        response = await  getUsersByID(id);
        //remove contraseña
        response.password=''
        }else{
        LogSuccess('[api/users] Get All users Request');
        response = await getAllUsers();    
      }
      return response;
     
    }



   // @Post("/logout")     
   

}
