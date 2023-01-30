import {Get, Route, Tags} from "tsoa";
import { IUserController } from "../interfaces/index";
import { LogSuccess, LogError } from "../../utils/logger";

//ORM - Users 

import { getAllUsers } from "../../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")


export class UserController implements IUserController {
    /**
     * endpoint para obtener los users de la coleccion de la base de datos 
     * 
     */
    
    
   public async getUsers(): Promise<any> {
       LogSuccess('[api/users] Get All users Request');

       const response = await getAllUsers();
    
       return response
    }
    
    }

    









