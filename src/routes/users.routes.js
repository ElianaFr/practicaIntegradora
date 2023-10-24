import { error } from "console";
import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.render("users");
});
router.post("/register", (req,res)=>{
    console.log(req.session);
    const loginForm =  req.body;
    // de esta manera se guarda la info de la sesion
    req.session.email = loginForm.email;
    req.session.last_name = loginForm.last_name;
    req.session.first_name = loginForm.first_name;
    req.session.age = loginForm.age;
    req.session.password = loginForm.password;
    console.log(req.session);
    res.send("peticion login");        
});
router.get("/login", (req,res)=>{
    const {name}= req.query;
    req.session.user= name;
    res.send("login y sesion creada en archivos")        
});

router.get("/profile",(req,res)=>{
    console.log(req.session);
    if(req.session.user){
        res.send(`informacion de perfil de ${req.session.user}`);
    }else{
        res.send("necesitas iniciar sesion")
    }
    
});
router.get("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.send("no se pudo cerrar la sesion");
        res.send("sesion finalizada")
    })
})


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