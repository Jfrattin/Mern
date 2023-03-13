import { IUser } from "./IUser.interfaces";

export enum Katalevel  {
    BASIC ='BASIC',
    MEDIUM ='MEDIUM',
    HIGH='HIGH' 
}
export interface IKata {
    name: string,
    description: string,
    level:Katalevel,
    intents:number,
    stars:number,
    creator: string,//Id creator
    solution: string,
    participants:string[],
}