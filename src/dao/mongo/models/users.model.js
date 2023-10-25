import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:{
        type:String,
        
    },
    password:{
        type: String,
        require:true,
        unique:true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

export const usersModel = mongoose.model(usersCollection,userSchema)