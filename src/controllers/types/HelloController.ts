import { BasicResponse } from ".";
import { IHellocontroller } from "../interfaces";
import { LogSuccess } from "../../utils/logger";

export class Hellocontroller implements IHellocontroller{
    
   public async getMessage(name?: string): Promise<BasicResponse> {
        
    
        LogSuccess('[/api/hello] Get Request');
        
        return{
            message: `Hello, ${name || "World"}! `

        }

    } 
}