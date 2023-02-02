import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    //Leer todos los usuarios de la base de datos si tengo o no id 
    getUsers(id?: string): Promise<any>
    //Delete user by ID
    deleteUser(id?: string): Promise<any>
    //Create user   
    deleteUser(user: any): Promise<any>   
    
}