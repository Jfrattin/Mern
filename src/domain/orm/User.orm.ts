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
// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
//initial  User models


//Configuration  of env
dotenv.config();
//Obtain Secret key to generate JWT
const  secret = process.env.SECRETKEY || 'MYSECRETKEY';

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



// - Get User By ID

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


export const getUsersByID = async (id:string): Promise<any | undefined> => {
   
    let usersModel = userEntity();
    try {
        
        // Search user by id
        return await usersModel.findById(id).select("id email name age");

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User by ID: ${error}`);
    }
}

// - Get User By Email


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
        let token = "0";

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
        LogError(`[ORM ERROR]: Creating User: ${error}`);
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


