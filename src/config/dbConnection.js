// conexion a la base de datos
import mongoose from "mongoose";

// creamos la funcion
export const connectDB = async()=>{
    // conexion a la base de datos
    try {
        await mongoose.connect('mongodb+srv://lef:coderback@cluster.7b2oiv7.mongodb.net/?retryWrites=true&w=majority');
        console.log("base de datos conectada correctamente");
    } catch (error) {
        console.log(`hubo un error conectando la base de datos : ${error.message}`);
    }
};

