// se crea un objeto con diferentes configuraciones 
// puede ser para configuracion de servidor,para conectar la base de datos
import dotenv from "dotenv";
// para poder leer lo del archivo .env
dotenv.config();

export const config = {
    server:{
        secretSession:process.env.SECRET_SESSION
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clienteSecret: process.env.GITHUB_CLIENT_SECRET
    }
}