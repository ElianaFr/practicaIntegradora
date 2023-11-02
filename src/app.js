import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
// mongoose
import { connectDB } from "./config/dbConnection.js";
// cookies
import cookieParser from "cookie-parser";
//modulo session
import session from "express-session";
// modulo mongostore
import MongoStore from "connect-mongo";
// modulo passport
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import {config} from "./config/config.js"

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionRouter } from "./routes/sessions.routes.js";



// se define el puerto
const port = 8080;
// definicion del modulo de express
const app = express();
// servidor http
const httpServer = app.listen(port,()=> console.log(`Servidor funcionando en el puerto ${port}`));
// servidor web socket para trabajar del lado del back
const io = new Server(httpServer);
// conectamos la base de datos mongoose
connectDB();

// configuracion handlebars
app.engine('.hbs', engine({extname: '.hbs', 
        runtimeOptions:{
            allowProtoMethodsByDefault:true,
            allowProtoPropertiesByDefault:true,
        }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));
// midleware para leer la info del body formulario
app.use(express.json());
//  midleware para leer la informacion del formulario http
app.use(express.urlencoded({extended:true}));
// se agrega la ruta donde van a estar nuestreos archivos publicos
app.use(express.static("public"));
// configuracion cookies
app.use(cookieParser("claveCookies"));
// session configuracion
app.use(session({
    // store: que no utilice la memoria del ordenador para guargar las sesiones
    // sino que utilice filestorage
    // propiedades ttil,retries,path
    // ttl el tiempo de la sesion
    // retries: el numero de veces que va a intentar de leer el archivo
    // path le indicamos donde van a estar las ssiones
    // se agrega almacenamiento de sesiones de mongo
    store: MongoStore.create({
        ttl:6000,
        // mongoUrl: "mongodb+srv://lef:coderback@cluster.7b2oiv7.mongodb.net/test?retryWrites=true&w=majority",
        mongoUrl: config.mongo.url,
        retries:0,
    }),
    secret: config.server.secretSession,
    // secret:"clavePrueba",
    resave:true,
    saveUninitialized:true
}));
// configurar passport
initializePassport();
//midleware se inicia passport dentro del servidor
app.use(passport.initialize());
// mideleware para crear una sesion dentro de la app
app.use(passport.session());

// routes
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/sessions",sessionRouter);

// socket server 
io.on("connection",async (socket)=>{
    // cargar datos en tiempo real
    console.log("cliente conectado");
    const products = await productsService.getProducts();
    socket.emit("productsArray",products);
    // cargar el producto que me paso el cliente
    socket.on("addProduct",async(productData)=>{
        const productForm = await productsService.addProduct(productData);
        const newList = await productsService.getProducts();
        socket.emit("productsArray",newList);
    });
    socket.on("deleteProd", async (deleteId)=>{
        const delList = await productsService.deleteProduct(deleteId);
        const upgradeList = await productsService.getProducts();
        socket.emit("nueva lista",upgradeList);
    })
});


