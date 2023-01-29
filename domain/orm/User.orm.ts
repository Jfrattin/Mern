import { userEntity } from "domain/entities/User.entity";

import { LogSuccess , LogError } from "@/utils/logger";

//crud

/**
 * Method for obtain for collection "users " from mongodb
 * 
 */
export const GetAllUsers =async (): Promise<any[] | undefined >  => {

    try {
        let userModel = userEntity();
        //search all user 
        return await userModel.find({isDelete:false})

    } catch(error){
        LogError(`[ORM ERROR] Getting All Users ${error}`);
    }
    
}