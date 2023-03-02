import {Get, Query, Route, Tags, Delete, Post, Put} from "tsoa";
import { IUserController } from "../interfaces/index";
import { LogSuccess, LogError } from "../../utils/logger";

//ORM - Users 

import { getAllUsers, getUsersByID, deleteUserByID, createUser, updateUserById} from "../../domain/orm/User.orm";


@Route("/api/users")
@Tags("UserController")


export class UserController implements IUserController {
   
  /**
     * endpoint para obtener los users de la coleccion de la base de datos 
     * 
     **/



@Get("/")
   public async getUsers(@Query()id?: string): Promise<any> { 
      
      let response: any = '';

      //si existe el ID como @query devuelvo solo ese user
      if(id){
        LogSuccess( `[api/users] Get User by ID: ${id} ` );
        response = await  getUsersByID(id);
        }else{
        LogSuccess('[api/users] Get All users Request');
        response = await getAllUsers();    
      }
      return response;
     
    }

  @Delete("/")
  public async deleteUser(@Query()id?: string): Promise<any> { 
     
     let response: any = '';

     //si existe el ID como @query devuelvo solo ese user
     if(id){
        LogSuccess( `[api/users] Get User by ID: ${id} ` );
        deleteUserByID(id).then((r) => {});
        response = { message: `Remove the object ${id} to database`
      }
       ;
       }else{
       LogSuccess('[api/users] Delete user Request');
       response = { 
        message: 'Please insert ID to remove in database'
        }
      }

          return response
   }
   @Post("/") 
   public async createUser(user:any): Promise<any> { 
    let response: any = "";
    await createUser(user).then((r)=>{
      LogSuccess('[api/users] Create user Request');
      response = { message: `User createdit: ${user.name}`};
    })
    ;

   
     return response;
    
    }

  @Put("/")
    public async updateUser(@Query()id:string, user:any): Promise<any> { 
      let response: any = '';

      //si existe el ID como @query devuelvo solo ese user
      if(id){
         LogSuccess( `[api/users] Update the object ${id} Update succesfully ` );
         updateUserById(id, user);
         response = {  message: `Update the object ${id} to database`};
        }else{
        LogSuccess('[api/users] Updat user Request');
        response = { 
         message: 'Please insert ID from Update USer'
         }
       }
 
      return response
      
    }
  


}




    









