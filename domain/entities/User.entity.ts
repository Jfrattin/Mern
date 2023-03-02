import mongoose from "mongoose";

export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            age: Number,
            password: String
        }
    )
    
return mongoose.model('Users', userSchema);
}
