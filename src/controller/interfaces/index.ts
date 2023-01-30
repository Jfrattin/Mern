import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    getUsers(): Promise<any>
}