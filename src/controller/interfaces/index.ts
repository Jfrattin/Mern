import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interfaces";
import { IKata } from "../../domain/interfaces/Ikatas.interfaces";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    //Leer todos los usuarios de la base de datos si tengo o no id 
    getUsers(page?:number , limit?: number, id?: string): Promise<any>
    //Delete user by ID
    deleteUser(id?: string): Promise<any>
    //Update user   
    updateUser(id:string , user: any): Promise<any>
    //Get Katas
    getKatas(page?:number , limit?: number, id?: string): Promise<any>
    
}

export interface IAuthcontroller{
    //register User
    RegisterUser(user: IUser):Promise<any>
    //login User 
    LoginUser(auth:any ):Promise<any>

    //
}

export interface IKatacontroller{
    //Get Katas
    getKatas(page?:number , limit?: number, id?: string): Promise<any>
    //Create katas:
    createKata(kata: IKata): Promise<any | undefined>
    //Delete Katas by ID
    deleteKata(id?: string): Promise<any>
    //Update Katas   
    updateKata(id:string , Katas: IKata): Promise<any>

}