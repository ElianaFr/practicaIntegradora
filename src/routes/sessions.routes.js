import { Router } from "express";

import { usersModel } from "../dao/mongo/models/users.model.js";

const router = Router();
// ruta para registrar y cargar un usuario
router.post("/signup", async(req,res)=>{
    try {
        const signForm = req.body;
        const result = await usersModel.create(signForm);
        res.render("login",{message:"Usuario registrado correctamente"})
    } catch (error) {
        res.render("signup",{error:"No se pudo registrar el usuario"})
    }
});
// ruta para iniciar sesion
router.post("/login", async(req,res)=>{
    try {
        const loginForm = req.body;
        const user = await usersModel.findOne({email:loginForm.email});
        // verificar usuario y contraseña
        if(!user){
            return res.render("login",{error:"usuario no encontrado"})
        };
        if(user.password !== loginForm.password){
            return res.render("login",{error:"contraseña incorrecta"})
        }
        // usuario y contraseña correcta, creamos la session
        req.session.email = user.email;
        res.redirect("/")
        } catch (error) {
        res.render("login",{error:"No se pudo iniciar sesion"})
    }
});
// ruta para log out
router.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profile",{error:"Imposible cerrar sesion"});
            res.redirect("/")
            
        });
    } catch (error) {
        res.render("signup",{error:"No se pudo registrar el usuario"})
    }
});














export {router as sessionRouter}






















// router.get("/",(req,res)=>{
//     res.render("users");
// });

// router.get("/login", (req,res)=>{
//     const {name}= req.query;
//     // en el objeto session agregamos la propiedad 
//     req.session.user= name;
//     res.send("login y sesion creada en archivos")        
// });

// router.get("/profile",(req,res)=>{
//     console.log(req.session);
//     if(req.session.user){
//         res.send(`informacion de perfil de ${req.session.user}`);
//     }else{
//         res.send("necesitas iniciar sesion")
//     }
    
// });
// 


// router.get("/logout",(req,res)=>{
    //     req.session.destroy(error=>{
    //         if(error) return res.send("no se pudo cerrar la sesion");
    //         res.send("sesion finalizada")
    //     })
    // })
    
    
// ruta para ingresar la cookie desde el usuario

// router.get("/",(req,res)=>{
//     //cookie(nombreCookie,valorCookie,options(tiempo de duracion))
//     res.cookie("galleta1", "oreo").send("cookie creada");
// });
// router.get("/cookie2",(req,res)=>{
//     //cookie(nombreCookie,valorCookie,options(tiempo de duracion))
//     res.cookie("galleta2", "ritz").send("cookie creada");
// });
// //ruta para leer lo del cliente
// router.get("/get-cookies", (req,res)=>{
//     console.log(req.cookies);
//     res.send("cookies recibidas");
// });
// ruta para eliminar cookies
// router.get("/delete",(res,req)=>{
//     res.clearCookies("galleta2").send("cookie eliminada")
// });