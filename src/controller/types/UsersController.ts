import {Get, Query, Route, Tags, Delete, Post, Put} from "tsoa";
import { IUserController } from "../interfaces/index";
import { LogSuccess, LogError, LogWarning } from "../../utils/logger";

import { IKata } from "../../domain/interfaces/Ikatas.interfaces";
//ORM - Users 

import { getUsersByID, deleteUserByID, updateUserById,getAllUsers,getKatasFromUser,createKata,valuekata } from "../../domain/orm/User.orm";
import { IUser } from "@/domain/interfaces/IUser.interfaces";


@Route("/api/users")
@Tags("UserController")


export class UserController implements IUserController {
  /**
     * endpoint para obtener los users de la coleccion de la base de datos 
     * 
     **/
  @Get("/")
    public async getUsers(@Query()page:number , @Query()limit: number,@Query() id?: string): Promise<any> { 
      
      let response: any = '';

      //si existe el ID como @query devuelvo solo ese user
      if(id){
        LogSuccess( `[api/users] Get User by ID: ${id} ` );
        response = await  getUsersByID(id);
        }else{
        LogSuccess('[api/users] Get All users Request');
        response = await getAllUsers(page,limit);  
      
      }
      return response;
     
    }
  @Delete("/")
   public async deleteUser(@Query()id?: string): Promise<any> { 
     
     let response: any = '';

     //si existe el ID como @query devuelvo solo ese user
     if(id){

        deleteUserByID(id).then((r) => {});
        response = { message: `Remove the object ${id} to database`}
        LogSuccess( `[api/users] Delete User by ID: ${id} ` );
       ;
       }else{
       LogSuccess('[api/users] Delete user Request');
       response = { 
        message: 'Please insert ID to remove in database'
        }
      }

      return response
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
  @Get("/katas") //Users/katas
    public async  getKatas( @Query()page:number , @Query()limit: number,@Query() id: string): Promise<any> {
    let response: any = '';
    //si existe el ID como @query devuelvo solo ese user
    if(id){
      LogSuccess( `[api/users] Get katas from User by ID: ${id} ` );
      response = await getKatasFromUser( page,limit,id);  
      }else{
      LogSuccess('[api/users] Error');
      response = {message: 'ID from user is needeed'};  
    
    }
    return response;
   

    //Las katas de este Usuario
   
    
    
    
    return response;
    }


  @Post("/") //Users
    public async createKata(kata: IKata): Promise<any> {
    let response: any = '';
    if(kata){
      LogSuccess(`[/api/katas] Create New Kata: ${kata.name} `);
      await createKata(kata).then((r) => {
          LogSuccess(`[/api/katas] Created Kata: ${kata.name} `);
          response = {
              message: `Kata created successfully: ${kata.name}`
          }
      });
        
    }else {
        LogWarning('[/api/katas] Register needs Kata Entity')
        response = {
            message: 'Kata not Registered: Please, provide a Kata Entity to create one'
        }
    }
    return response;
}
  
@Post("/value") //Users
public async valuekatas({ id, value }: { id: string; value: number; }): Promise<any> {
let response: any = '';
if(id&&value){
  LogSuccess(`[/api/katas] Value Kata: ${id} `);
  await valuekata(id,value).then((r) => {
      LogSuccess(`[/api/katas] Value Kata: ${id} `);
      response = {
          message: `Kata value successfully: ${id}`
      }
  });
    
}else {
    LogWarning('[/api/katas] Register needs Kata Entity')
    response = {
        message: 'Kata not Registered: Please, provide a Kata Entity to create one'
    }
}
return response;
}

}




    









