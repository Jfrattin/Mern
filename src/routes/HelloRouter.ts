
import { Hellocontroller } from "../controllers/types/HelloController";
import express, { Request, Response} from "express";
import { LogInfo } from "../utils/logger";



// ROUTER from express 
let HelloRouter = express.Router();


HelloRouter.route('/')

// GET --> http://localhost:8000/api/hello?name=Martin/
        .get(async(req: Request, res: Response)=>{
            // Obtain querry param
            let name: any = req?.query?.name;
            LogInfo(`Query Param: ${name}`);
            //controler instance to execute method 
            const controller:  Hellocontroller = new Hellocontroller();
            //obtain  Response
            const response = await controller.getMessage(name);
            // Send to the client the response 
            return res.send(response)
})

//* Export HelloRouter
export default HelloRouter;