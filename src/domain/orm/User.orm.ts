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

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
//initial  User models
let usersModel = userEntity();

//Configuration  of env
dotenv.config();
//Obtain Secret key to generate JWT
const  secret = process.env.SECRETKEY || 'MYSECRETKEY';

export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {   
        
        // Search all users
        return await usersModel.find({isDelete:false});
    

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users 1: ${error}`);
    }
};


// TODO:
// - Get User By ID



export const getUsersByID = async (id:string): Promise<any | undefined> => {
   

    try {
        
        // Search user by id
        return await usersModel.findById(id);

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User by ID: ${error}`);
    }
}

// - Get User By Email


// - Delete User By ID
export const deleteUserByID =async (id:string): Promise<any | undefined> => {  
   

    try {    
            return await usersModel.deleteOne({ _id: id });

    }catch(error) {
        LogError(`[ORM ERROR]: Delete User by ID: ${error}`);
    }
    
}
// - Create New User

export const createUser =async (user:any): Promise<any | undefined> => {
   

    try{
        //create inser new user
        return await usersModel.create(user);
    }catch(error){
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }


    
}
// - Update User By ID

export const updateUserById = async (id:string ,user:any ) : Promise<any | undefined> => {
    

    try{
        //update user
        return await usersModel.findByIdAndUpdate(id, user);

    }catch(error){
        LogError(`[ORM ERROR]: Updating User: ${user}:: {error}`)
    }
}
// Login User

export const LoginUser = async (auth: IAuth): Promise<any | undefined> => {
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

