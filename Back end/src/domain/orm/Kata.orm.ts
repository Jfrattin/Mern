import { KataEntity } from "../entities/Kata.entity";

import { LogSuccess, LogError } from "../../utils/logger";
//impor Iuser // IAuth
import { IKata } from "../interfaces/Ikatas.interfaces";

//import bcrypt 
import bcrypt from 'bcrypt';

//import .env
import dotenv from 'dotenv';

//Configuration  of env
dotenv.config();
//Obtain Secret key to generate JWT
const  secret = process.env.SECRETKEY || 'MYSECRETKEY';
/**
 * Method to obtain all Katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (page:number, limit:number, atribute?:string): Promise<any[] | undefined> => {
    try {   
        let KataModel = KataEntity()
        let response: any = {} ;
        // Search all Katas
        KataModel.find({isDeleted: false})
                  .limit(limit)
                  .skip((page-1)*limit)           
                  .exec().then((katas: IKata[]) => {
                    if(atribute){
                        switch(atribute){
                            case "stars":
                                //console.log("ordena atars")
                                response.katas = katas.sort((a,b)=>(a.stars-b.stars))
                            case "level":
                                    //console.log("ordena level")
                                    let abasic, amedium, ahigh;
                                    abasic = katas.filter(a => a.level=="BASIC")
                                    amedium= katas.filter(a=> a.level== "MEDIUM")
                                    ahigh= katas.filter(a =>  a.level== "HIGH")
                                    response.katas =  abasic.concat(amedium,ahigh)
                            }
                                     }else{
                                        response.katas = katas;
                                     }
                    
                     })
                  //Count Total document in collection "KAtas"
                  await KataModel.countDocuments().then((total:number)=> {
                    response.totalpages = Math.ceil(total/limit);
                    response.currentpage = page;
                  })
        return response
      } catch (error) {
        LogError(`[ORM ERROR]: Getting All Katas 1: ${error}`);
        }
};
// - Get Kata By ID
export const getKataByID = async (id:string): Promise<any | undefined> => {

    try {
        let KataModel = KataEntity()
        // Search user by id
        return await  KataModel.findById(id)
        //.select("id email name age");
    } catch (error) {
        LogError(`[ORM ERROR]: Getting Kata by ID: ${error}`);
    }
}
// - Delete Kata By ID
export const deleteKataByID =async (id:string): Promise<any | undefined> => {  
   
      
    try {    
        let KataModel = KataEntity()
            return await  KataModel.deleteOne({ _id: id });

    }catch(error) {
        LogError(`[ORM ERROR]: Delete User by ID: ${error}`);
    }
    
}
// - Create New Kata
export const createKata =async (kata:IKata): Promise<any | undefined> => {
   
    try{
     
        //create  new Kata
        let KataModel = KataEntity()
        return await KataModel.create(kata);
    }catch(error){
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
    }
}
// - Update  Kata By ID
export const updateKataById = async (id:string , kata:IKata ) : Promise<any | undefined> => {

    try{
        let KataModel = KataEntity()
        //update user
        return await KataModel.findByIdAndUpdate(id, kata);

    }catch(error){
        LogError(`[ORM ERROR]: Updating Kata: ${kata}:: {error}`)
    }
}
// Get kata by name
export const getKataByname = async (name:string): Promise<any | undefined> => {

    try {
        let KataModel = KataEntity()
        // Search user by id
        return await  KataModel.findById(name)
        //.select("id email name age");

        


    } catch (error) {
        LogError(`[ORM ERROR]: Getting Kata by ID: ${error}`);
    }
}