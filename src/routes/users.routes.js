import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.render("users");
});
router.post("/login", (req,res)=>{
    console.log(req.session);
    const loginForm =  req.body;
    // de esta manera se guarda la info de la sesion
    req.session.email = loginForm.email;
    console.log(req.session);
    res.send("peticion login");        
});
router.get("/profile",(req,res)=>{
    console.log(req.session);
    res.send("informacion de perfil")
});


export {router as sessionRouter}

    
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