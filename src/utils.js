import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";

export const __dirname=path.dirname(fileURLToPath(import.meta.url));

// crear la funcion para el hash password
// se le pasa el password que ingresan en el form
export const createHash = (password)=>{
    // usamos el motodo hashSync, es el que genera el hash
    // los datos que le paso son pass y el algotirmo gensaltsync
    // esos anteriores realizan el hash
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};
// los datos que vienen del login
export const comparePass = (password,user)=>{
    // toma el pass que ingresa en login y la compara con 
    // el hash pass guardado en user.pass. devuelve true o false
    return bcrypt.compareSync(password,user.password);
};















// // diskStorage almacenamiento en memoria del server
// const storage = multer.diskStorage({
//     // donde se guardan los archivos
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,"../public/images"))
//     },
//     // con que nombre vamos a guardar el archivo
//     filename:function(req,file,cb){
//         cb(null,`${file.originalname}`)
//     }
// });
// export const uploader = multer({storage});
