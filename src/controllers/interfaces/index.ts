import { BasicResponse } from "../types";

export interface IHellocontroller{
    getMessage(name?:string):Promise<BasicResponse>;

};

export interface IGoodbyecontroller{
    getMessage(name?:string):Promise<BasicResponse>;

}