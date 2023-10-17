import { Router } from "express";
import { cartsService, productsService } from "../dao/index.js";


const router = Router();

// solo rutas get porque las esta ejecutando desde el navegador
router.get("/", async (req,res)=>{
    // todos los datos que necesito para getProducts lo paso como query params
    const {limit=10,page=1} = req.query;
    // detallo los filtros
    const query = {
        // category,
        // stock
    };
    const options = {
        limit,
        page,
        // sort,
        lean:true
    }
    try {
        const result = await productsService.getProductsPaginate(query,options);
        // la ruta del servidor. protocolo que estamos utilizando
        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        const data ={
            status:"success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
            nextLink: result.hasNextPage ? baseUrl.includes("page") ?
            baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null    
        }
        console.log(data);
        res.render("home",data);    
    } catch (error) {
        res.status(404)
    }        
});
router.get("/:prodId", async(req,res)=>{
    try {
        const prodId = req.params.prodId;
        const product = await productsService.getProductsById(prodId);
        console.log("product",product);
        res.render("productDetail",{product});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.get("/:cid/product/:pid",async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        console.log(cartId,productId)
        const cart = await cartsService.addProduct(cartId,productId);
        // res.json({status:"success",cart});
        res.render("cart",cart)
    } catch (error) {
        res.status(404).json({status:"error",message:error.message});
    }
});
router.get("/carts",async (req,res)=>{
    const cartId= '6525e2b9fbc880249bbc09bc';

    try {
        const cart = await cartsService.getCartById(cartId);
        console.log(cart)
        if(!cart){
            return res.status(404).send('carrito no encontrado');
        }
        res.render("cart",cart.products)
    } catch (error) {
        res.status(404).json({status:"error",message:error.message});
    }
});


router.get("/realtimeproducts", (req,res)=>{
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(404)
    }
});


export {router as viewsRouter};
