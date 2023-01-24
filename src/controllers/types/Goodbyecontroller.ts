
import { IGoodbyecontroller } from "../interfaces";
import { LogSuccess } from "../../utils/logger";
import { BasicgoodbyeResponse } from ".";

export class GoodbyeController implements IGoodbyecontroller{
    
   public async getMessage(name?: string): Promise<BasicgoodbyeResponse> {
        
        let now = new Date();
    
        LogSuccess('[/api/hello] Get Request');
        
        return{
            message: ` Goodbye!, ${name || "World"}! `,
            date: `${now}` ,
        }

    } 
}