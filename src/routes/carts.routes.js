import { Router } from "express";
// import { cartsService } from "../dao/index.js";
// import { ProductsService } from "../service/products.service.js";
import { CartsController } from "../controllers/carts.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();
router.get("/",CartsController.getCarts);
router.get("/:cid",CartsController.getCartById);
router.post("/",checkRole(["user"]),CartsController.createCart);
router.delete("/:cid/products/:pid",checkRole(["user"]), CartsController.deleteProdCart);
router.delete("/:cid",checkRole(["user"]),CartsController.deleteCart);
router.put("/:cid/product/:pid",CartsController.updateCart);
router.post("/:cid/purchase", CartsController.purchaseCart);

export {router as cartsRouter}


// router.get("/", async (req,res)=>{
//     try {
//         const carts = await cartsService.getCart()
//         res.json({status:"success",carts});
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message})
//     }
// });
// router.get("/:cid", async (req,res)=>{
//         try {
//             const cartId = req.params.cid;
//             const cart = await cartsService.getCartById(cartId);
//             res.json(cart);
//         } catch (error) {
//             res.status(404).json({status:"error",message:error.message});
//         }
// });
// router.post("/",async (req,res)=>{
//     try {
//         const createCart = await cartsService.createCart();
//         res.json({status:"success",createCart})
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// router.post("/:cid/product/:pid",async (req,res)=>{
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;
//         const cart = await cartsService.addProduct(cartId,productId);
//         res.json({status:"success",cart});
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// router.delete("/:cid/products/:pid", async(req,res) =>{
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;
//         const cart = await cartsService.deleteProduct(cartId,productId);
//         res.json({status:"success",cart});
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// router.delete("/:cid/products/:pid", async(req,res) =>{
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;
//         const cart = await cartsService.deleteProduct(cartId,productId);
//         res.json({status:"success",cart});
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// router.delete("/:cid", async(req,res) =>{
//     try {
//         const cartId = req.params.cid;
//         const cart = await cartsService.deleteProdCart(cartId);
//         res.json({status:"success",cart});
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// router.put("/:cid/product/:pid",async (req,res)=>{
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;
//         const {newQuantity} = req.body; 
//         const cart = await cartsService.updateProdCart(cartId,productId,newQuantity);
//         res.json({status:"success",cart});
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
    




// // localhost:8080/api/carts
// router.get("/", async (req,res)=>{
//     try {
//         const carts = await cartsService.getCarts()
//         res.json(carts)
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message})
//     }
// });
// // /api/carts/:cid
// router.get("/:cid", async (req,res)=>{
//     try {
//         const cartId = parseInt(req.params.cid);
//         const cart = await cartsService.getCartById(cartId);
//         res.json(cart);
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// //api/cart/:cid/
// router.post("/:cid/products/:pid",async (req,res)=>{
//     try {
//         const cartId = parseInt(req.params.cid);
//         const prodId = parseInt(req.params.pid);
//         const upCart = await cartsService.updateCart(cartId,prodId);
//         const cartNew = await cartsService.getCartById(cartId)
//         res.json({cartNew})
//     } catch (error) {
//         res.status(404).json({error:error.message});
//     }
// });

// router.post("/",async (req,res)=>{
//     try {
//         const createCart = await cartsService.createCarts();
//         res.json({data:createCart})
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });

