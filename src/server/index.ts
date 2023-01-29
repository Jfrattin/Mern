import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

// Env
import dotenv from 'dotenv';

// Security 
import cors from 'cors';
import helmet from "helmet";

// TODO HTTPS 

//Root Router 
import rootRuter from "../routes";


//configuration env
dotenv.config();

//Create express APP
const server: Express = express();

//Define SERVER to use "/api"
//From  this point onover: http://localhost:8000/api/...

server.use(
        '/api',
        rootRuter
);

//Static Server

server.use(express.static('public'));

// TODO mongose CONECCTION
mongoose.connect('mongodo://localhost:27017/codeverification')

//Security server

server.use(helmet());
server.use(cors());

//Contect types limite de 50mb 

server.use(express.urlencoded({extended:true , limit: '50mb'}));
server.use(express.json({limit:'50mb'}));

// *Redirections
// https:localhost8000/ --> API http://localhost:8000/api/

server.get('/',  (req:Request, res:Response ) => {
    res.redirect('/api');
})

export default server; 
