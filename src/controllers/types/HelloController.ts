import {Get, Query, Route, Tags} from "tsoa";
import { BasicResponse } from ".";
import { IHellocontroller } from "../interfaces";
import { LogSuccess } from "../../utils/logger";
import { get } from "http";

@Route("/api/hello")

@Tags("Hellocotroller")

export class Hellocontroller implements IHellocontroller{
    /**
     * End point to retreive a Message "hello" {name} in jason
     * @param  {string|BasicResponse} name of user to be greated
     * @returns {BasicResponse}Promise of BasicResponse
     */
  
    @Get("/")
    public async getMessage(name?: string): Promise<BasicResponse> {
        
    
        LogSuccess('[/api/hello] Get Request');
        
        return{
            message: `Hello, ${name || "World"}! `

        }

    } 
}