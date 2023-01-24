
import { GoodbyeController } from "../controllers/types/Goodbyecontroller";
import express, { Request, Response} from "express";
import { LogInfo } from "../utils/logger";

// ROUTER from express 
let GoodbyeRouter = express.Router();


GoodbyeRouter.route('/')

// GET --> http://localhost:8000/api/goodbye?name=Martin/
        .get(async(req: Request, res: Response)=>{
            // Obtain querry param
            let name: any = req?.query?.name;
            LogInfo(`Query Param: ${name}`);
            //controler instance to execute method 
            const controller:  GoodbyeController = new GoodbyeController();
            //obtain  Response
            const response = await controller.getMessage(name);
            // Send to the client the response 
            return res.send(response)
})

//* Export GoodbyeRoute
export default GoodbyeRouter;