import  jwt  from "jsonwebtoken";
import { Request, Response,  NextFunction, response } from "express";
/** 
 * @param req Original request previous middleware of verification JWT
 * @param res Response to verification  of JWT
 * 
 * @param {NextFunction} next next function  to be executed 
 * 
 * @return    
 * 
*/



export const verifyToken = (req:Request , res: Response, next:NextFunction ) => {

    //Chek header from Request from ' x-access-token'
     let token: any = req.headers['x-access-token'];
     
     if(!token){
        return res.status(403).send({
            authenticationError: 'Missing jwt',
            message:'Not authorised to consume the endpoint'})
     }
     
     jwt.verify(token,'', (err: any, decoded: any) => {
        //if jwt not okay
        if(err){
            return res.status(500).send({
                authenticationError: 'jwt verification failed',
                message:'NFailed to verity JWT token is required'})
        }
        //if jwt is OK
        next();
     })


}