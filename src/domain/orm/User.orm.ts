import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
//initial  User models
let usersModel = userEntity();

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
