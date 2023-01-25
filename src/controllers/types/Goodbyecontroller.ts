import {Get, Query, Route, Tags} from "tsoa";
import { IGoodbyecontroller } from "../interfaces";
import { LogSuccess } from "../../utils/logger";
import { BasicgoodbyeResponse } from ".";

@Route("/api/goodbye") 
@Tags(" GoodbyeController")

export class GoodbyeController implements IGoodbyecontroller{
    
 /**
     * End point to retreive a Message "goodbye" {name} and date,  in jason
     * @param  {string|BasicResponse} name of user to be greated
     * @returns {BasicgoodbyeResponse}Promise of BasicResponse
     */


   public async getMessage(name?: string): Promise<BasicgoodbyeResponse> {
        
        let now = new Date();
    
        LogSuccess('[/api/hello] Get Request');
        
        return{
            message: ` Goodbye!, ${name || "World"}! `,
            date: `${now}` ,
        }

    } 
}