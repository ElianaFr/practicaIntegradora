import mongoose from "mongoose";
// definimos donde guardamos los productos
const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    products:{
        type:[{
            // agrego el id de mongoose
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity:{
                type:Number,
                require:true,
            }
        }
        ],
    default:[]
    }   
});
// el modelo lo creo desde mongoose con el metodo model, necesita el nombre de la coleccion
// y el esquema de lo que estoy pasando
export const cartsModel= mongoose.model(cartsCollection, cartSchema);