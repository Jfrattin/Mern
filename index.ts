import express, { Express, Request, response, Response} from "express";
import dotenv from "dotenv";

//configuration .env
dotenv.config();

//create Express APP

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

//Define the first route of APP

app.get('/' , (req: Request ,res: Response) => {

    //send hello word
    
    res.send('Welcome to app express + TS + swagger + Mongoose ') ;
    
    });

    app.get('/hello' , (req: Request ,res: Response) => {

        //send hello 
        
        res.send('hello') ;
        
        });


 // Reques app
 
 app.listen(port, () => {
    console.log(`EXPRESS SERVER: running at http://localhost:${port}`); 
    }
    );
    