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
        type:Number,
    },
    password:{
        type: String,
        require:true,
        unique:true
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    role: {
        type: String,
        required: true,
        enum:["user","admin"],
        default: 'user'
    }
});

export const usersModel = mongoose.model(usersCollection,userSchema)