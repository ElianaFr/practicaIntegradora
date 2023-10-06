import mongoose, { Mongoose } from "mongoose";
// definimos donde guardamos los productos
const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type:Number,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true,
    },
    code:{
        type:Number,
        require:true,
        unique:true
    },
    stock:{
        type:Number,
        require:true,
    },
    category:{
        type:String,
        require:true,
        enums:["Hombre","Mujer","Unisex"]
    }
});
	


// el modelo lo creo desde mongoose con el metodo model, necesita el nombre de la coleccion
// y el esquema de lo que estoy pasando
export const productsModel= mongoose.model(productsCollection, productSchema);