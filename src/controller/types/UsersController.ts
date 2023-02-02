import {Get, Query, Route, Tags} from "tsoa";
import { IUserController } from "../interfaces/index";
import { LogSuccess, LogError } from "../../utils/logger";

//ORM - Users 

import { getAllUsers, getUsersByID } from "../../domain/orm/User.orm";


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
  }
    

    









