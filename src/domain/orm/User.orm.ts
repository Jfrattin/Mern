import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */

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
// - Create New User
// - Update User By ID
