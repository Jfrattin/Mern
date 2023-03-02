import mongoose from "mongoose"; 
import {IUser }  from "../interfaces/IUser.interfaces" ;

export const userEntity = () => {

    //let userSchema = new mongoose.Schema(
      ///  {
       //     name: String,
         //   email: String,
           // age: Number
        //}
    //)
    let userSchema = new mongoose.Schema<IUser>(
        {
            name: {type:  String, required:true },
            email:  {type:  String, required:true },
            password:  {type:  String, required:true },
            age:  {type: Number  , required:true }
        }
    )
    

    return mongoose.model('users', userSchema) || mongoose.model<IUser>('Users',userSchema);

}