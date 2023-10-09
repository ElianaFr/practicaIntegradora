import mongoose from "mongoose";
// definimos donde guardamos los productos
const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    price:{
        type:Number,
        require:true,
    },
    code:{
        type:Number,
        require:true,
        unique:true
    },
    quantity:{
        type:Number,
        require:true,
    }
});
// el modelo lo creo desde mongoose con el metodo model, necesita el nombre de la coleccion
// y el esquema de lo que estoy pasando
export const cartsModel= mongoose.model(cartsCollection, cartSchema);