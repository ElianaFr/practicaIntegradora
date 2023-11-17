import passport from "passport";
// importar la estrategia
import localStrategy from "passport-local";
import { createHash, comparePass } from "../utils.js";
import { config } from "./config.js";
import { UserService } from "../service/user.service.js";
// import { userService } from "../dao/index.js";
import GithubStrategy from "passport-github2";

// conectar passport con la session
export const initializePassport = ()=>{
    // crear estrategias
    // se crea la estrategia de registro
    passport.use("signupLocalStrategy",new localStrategy(
        // para acceder a los datos adicionales que no son email y pass
        // se pasa el obj req del form al callback (async)
        // se define cual sera el name para ingresar en este caso se define el mail
        {
            passReqToCallback:true,
            usernameField: "email",
        },
        // funcion callback
        // done sirve para indicarle al servidor si se realizo de forma correcta
        async (req,username,password,done)=>{
            // extraemos los datos pasados por el form
            // email y pass ya estan pasados
            const {first_name,last_name,age} = req.body;
            try {
                // consultar si el usuario ya estaba cargado
                // si esta me devuelve el usuario sino undifined
                const user = await UserService.getUserByEmail(username);
                
                // const user = await userService.getUserByEmail(username);
                if(user){
                    // si el usuario existe no se puede proceder a registrarlo
                    // le paso null porque ya el mail existe y false porque no se puede autenticar
                    return done(null,false);
                }
                const newUser ={
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password:createHash(password)
                };
                const userCreated = await UserService.createUser(newUser);
                
                // const userCreated = await userService.createUser(newUser);
                return done(null,userCreated);
            } catch (error) {
                // si hay error en la autenticacion
                return done (error);
            }
        }
    ));
    // passport para el login
    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField:"email",
        },
        async (username,password,done)=>{
            try {
                const user = await UserService.getUserByEmail(username);
                
                // const user = await userService.getUserByEmail(username);
                // validamos si el usuario esta registrado
                if(!user){
                    // usuario no registrado
                    return done (null, false)
                };
                if (!comparePass(password,user)){
                    return done (null,false)
                };
                return done (null,user)

            } catch (error) {
                return done (error);
            }
        }
    ))
    // estrategia de registro GITHUB
    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clienteSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackURL}`
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                console.log("profile",profile);
                const user = await UserService.getUserByEmail(profile.username);
                
                // const user = await userService.getUserByEmail(profile.username);
                // el usuario ya esta registrado
                if(user){
                    return done (null,user)
                };
                // sino lo crea
                const newUser ={
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    age:null,
                    email:profile.username,
                    password:createHash(profile.id)
                };
                const userCreated = await UserService.createUser(newUser);
                
                // const userCreated = await userService.createUser(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done (error)
            }
        }
    ));

    // para la conexion de la ssession
    // SOLO GUARDA EL ID en la session
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async (id,done)=>{
        // VER SI EXISTE ELUSUARIO, traemos la info
        // quedara guardada en req.user
        const user = await UserService.getUserById(id);
        
        // const user = await userService.getUserById(id);
        done(null,user)
    });

};