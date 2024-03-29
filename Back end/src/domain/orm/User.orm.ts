import { userEntity } from "../entities/User.entity";
import  jwt from "jsonwebtoken";
import { LogSuccess, LogError } from "../../utils/logger";
//impor Iuser // IAuth
import { IUser } from "../interfaces/IUser.interfaces";
import { IAuth } from "../interfaces/IAuth.interfaces";
//import bcrypt 
import bcrypt from 'bcrypt';
//import .env
import dotenv from 'dotenv';
import { KataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/Ikatas.interfaces";
//import { UsersResponse } from "../types/userResponse";
import mongoose from "mongoose";

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */

//Configuration  of env
dotenv.config();
//Obtain Secret key to generate JWT
const  secret = process.env.SECRETKEY || 'MYSECRETKEY';
// Get All Katas
export const getAllUsers = async (page:number, limit:number): Promise<any[] | undefined> => {
    try {   
        const usersModel = userEntity();
        
        let response: any = {} ;
       
        // Search all users
        usersModel.find({isDeleted: false})
                  .limit(limit)
                  .select('id name email age katas')
                  .skip((page-1)*limit)
                 
                  
                  .exec().then((users: IUser[]) => {
                 
                    response.users = users;
                     })
                  //Count Total document in collection "Users"
                  await usersModel.countDocuments().then((total:number)=> {
                    response.totalpages = Math.ceil(total/limit);
                    response.currentpage= page;
                  })
        return response
        
        
              
        
    

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users 1: ${error}`);
    }
};
// - Get Katas From User
export const getKatasFromUser = async (page: number, limit: number, id:string ): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        let katasModel = KataEntity();

        let katasFound: IKata[] = [];

        let response: any = {
            katas: []
        };

        console.log('User ID', id);

        await userModel.findById(id).then(async (user: IUser) => {
            response.user = user.email;
            
             console.log('Katas from User', user.katas);

            // Create types to search
            let objectIds:mongoose.Types.ObjectId[]  = [];
            user.katas.forEach((kataID: string) => {
                let objectID = new mongoose.Types.ObjectId(kataID);
                objectIds.push(objectID);
            });

            await katasModel.find({"_id": {"$in": objectIds }}).then((katas: IKata[]) => {
                katasFound = katas;
            });

        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining User: ${error}`);
        })

        response.katas = katasFound;

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }
}
// - Get User By ID
export const getUsersByID = async (id:string): Promise<any | undefined> => {
   
    let usersModel = userEntity();
    try {
        
        // Search user by id
        return await usersModel.findById(id).select("id email name age");

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User by ID: ${error}`);
    }
}
// - Delete User By ID
export const deleteUserByID =async (id:string): Promise<any | undefined> => {  
   
    let usersModel = userEntity();
    try {    
            return await usersModel.deleteOne({ _id: id });

    }catch(error) {
        LogError(`[ORM ERROR]: Delete User by ID: ${error}`);
    }
    
}
// - Update User By ID
export const updateUserById = async (id:string ,user:any ) : Promise<any | undefined> => {
    
    let usersModel = userEntity();
    try{
        //update user
        return await usersModel.findByIdAndUpdate(id, user);

    }catch(error){
        LogError(`[ORM ERROR]: Updating User: ${user}:: {error}`)
    }
}
// Login User
export const LoginUser = async (auth: IAuth): Promise<any | undefined> => {
    let usersModel = userEntity();
    try {
        
        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = "";

        // Check if user exists by Unique Email
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[ERROR Authentication in ORM]: User Not Found`);
            throw new Error(`[ERROR Authentication in ORM]: User Not Found: ${error}`);
        });

        // Check if Password is Valid (compare with bcrypt)
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if(!validPassword){
            console.error(`[ERROR Authentication in ORM]: Password Not Valid`);
            throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`);
        }else{   
            token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "2h" });

        return {
            token: token,
            user: userFound
        }}

        // Generate our JWT
         

    } catch (error) {
        LogError(`[ORM ERROR]: Login User: ${error}`);
        return {
            token: '',
            user: 'User not found'
        }
    }
}
// Register User
export const registerUser = async (user: IUser) : Promise<any | undefined> => {
    let usersModel = userEntity();
    try{
        //create inser new user
        return await usersModel.create(user);
    }catch(error){
        LogError(`[ORM ERROR]: Register User: ${error}`);
    }


}
//Logout User
export const logoutUser = async (user:IUser ) : Promise<any | undefined> => {
}

// Create Kata By User
export const createKata = async(kata: IKata): Promise<any | undefined> => {
    
    const kataModel =  KataEntity();

    let userModel = userEntity();


    try{
        //create  new Kata
        let  katanew : IKata; 
        let userupdate : any;
        let idkata;
        //Create User
        if(kata){
            //Add kata
            console.log (await kataModel.insertMany(kata));
            //Search user creator
            userupdate = await userModel.findById(kata.creator);
            //busco el id de la ultima cata 
            idkata = await kataModel.findOne({}, { _id: 1 }, { sort: { _id: -1 }, limit: 1 });
            console.log(idkata.id)
            console.log(userupdate);
            userupdate.katas.push(idkata.id);
            if(await userModel.findByIdAndUpdate(kata.creator,userupdate)){
                console.log("modelo actualizado")
            };
              }
        else{ console.log("error")}

    }catch(error){
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
    }      
}

//  Value Kata By User
export const valuekata = async(idkata: string, value: number): Promise<any | undefined> => {
    
    const kataModel =  KataEntity();
    try{
        let kataupdate :any;
        //search and update kata
        if(idkata&&value){
            //Search kata user creator
            kataupdate= await kataModel.findById(idkata);
            //average
            kataupdate.stars= ((kataupdate.stars+value)/2.0)
            console.log(kataupdate.name, kataupdate.stars);
            if(await kataModel.findByIdAndUpdate(idkata,kataupdate)){
                console.log("modelo actualizado")
            };
              }
        else{ console.log("error")}

    }catch(error){
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
    }      
}
//  delete kata 
export const deleteKata = async(idkata: string, iduser: string,): Promise<any | undefined> => {
    
    const kataModel =  KataEntity();
    try{
        let kataupdate :any;
        //search and update kata
        if(idkata&&iduser){
            //Search kata user creator
            kataupdate= await kataModel.findById(idkata);
            if(kataupdate.creator==iduser)
                {
                    await kataModel.findByIdAndDelete(idkata)
                    LogSuccess(`[ORM SUCCESS]: Kata ${idkata} deleted completed `)
                }
                console.log("Kata deleted")
            } 
        else{'[ORM ERROR]: Insert IDkata and IDuser'}
        }catch(error){
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
        }}
/// edit kata
export const editKata= async( kataedit: IKata ,idkata: string, iduser: string): Promise<any | undefined> => {
    
            const kataModel =  KataEntity();
            try{
                let kataupdate :any;
                //search and update kata
                if(idkata&&iduser){
                    //Search kata user creator
                    kataupdate= await kataModel.findById(idkata);
                    if(kataupdate.creator==iduser)
                        {
                            await kataModel.findByIdAndUpdate(idkata,kataedit)
                            LogSuccess(`[ORM SUCCESS]: Kata ${idkata} deleted completed `)
                        }
                        console.log("Kata deleted")
                    } 
                else{'[ORM ERROR]: Insert IDkata and IDuser'}
                }catch(error){
                LogError(`[ORM ERROR]: Creating Kata: ${error}`);
                }}
//Solvekata
export const solveKata= async( solutionkata: string ,idkata: string, iduser: string): Promise<any | undefined> => {
    
    const kataModel =  KataEntity();
    try{
        let kataupdate :any;
        //search and update kata
        if(idkata&&iduser&&solutionkata){
            //Search kata
            kataupdate = await kataModel.findById(idkata);
            kataupdate.solution=solutionkata
            kataupdate.participants.push(iduser);        
            await kataModel.findByIdAndUpdate(idkata,kataupdate)
                    LogSuccess(`[ORM SUCCESS]: Kata  solution ${kataupdate.name} completed `)
                
                console.log("Kata completed")
            } 
        else{'[ORM ERROR]: Insert IDkata and IDuser'}
        }catch(error){
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
        }}