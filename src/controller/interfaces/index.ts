import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interfaces";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    //Leer todos los usuarios de la base de datos si tengo o no id 
    getUsers(id?: string): Promise<any>
    //Delete user by ID
    deleteUser(id?: string): Promise<any>
    //Update user   
    updateUser(id:string , user: any): Promise<any>
}

export interface IAuthcontroller{
    //register User
    RegisterUser(user: IUser):Promise<any>
    //login User 
    LoginUser(auth:any ):Promise<any>

    //
}