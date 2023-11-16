export class SessionController {
    static redirectLogin = async(req,res)=>{
        res.render("login",{message:"Usuario registrado correctamente"})
    };
    static failSignup = async (req,res)=>{
        res.render("signup",{error:"No se pudo registrar el usuario"})
    };
    static redirectHome = async(req,res)=>{
        res.redirect("/")
    };
    static failLogin = async (req,res)=>{
        res.render("login",{error:"no se pudo iniciar sesion, correo o contraseña incorrectos"});
    };
    static githubSignup = async (req,res)=>{
        res.redirect("/")
    };
    static logout = async(req,res)=>{
        try {
            req.session.destroy(err=>{
                if(err) return res.render("profile",{error:"Imposible cerrar sesion"});
                res.render("login")
                
            });
        } catch (error) {
            res.render("signup",{error:"No se pudo cerrar sesion"})
        }
    };
}