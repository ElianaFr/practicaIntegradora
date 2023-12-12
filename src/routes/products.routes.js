import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/auth.js";
// import { productsService } from "../dao/index.js";
// import mongoose from "mongoose";

const router = Router();
// route Controller
router.get("/", ProductsController.getProducts);
router.get("/:prodId",ProductsController.getProductsById);
router.post("/", ProductsController.createProduct);
router.put("/:prodId", ProductsController.updateProduct);
router.delete("/:prodId",ProductsController.deleteProduct);

// router.post("/",checkRole(["admin"]), ProductsController.createProduct);
// router.put("/:prodId",checkRole(["admin"]), ProductsController.updateProduct);
// router.delete("/:prodId",checkRole(["admin"]),ProductsController.deleteProduct);



export {router as productsRouter}


// route sin controller
// router.get("/", async(req,res)=>{
//     try {
//         const products = await productsService.getProducts();
//         res.json({status:"success",data:products});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });
// router.get("/:prodId", async(req,res)=>{
//     try {
//         const prodId = req.params.prodId;
//         const product = await productsService.getProductsById(prodId);
//         res.json({status:"success",data:product});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });
// router.post("/", async(req,res)=>{
//     try {
//         const product = req.body;
//         const productsList = await productsService.addProduct(product);
//         res.json({status:"success",data:productsList});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });
// router.put("/:prodId", async(req,res)=>{
//     try {
//         const product = req.body;
//         const prodId = req.params.prodId
//         const productUpdate = await productsService.updateProduct(prodId,product);
//         res.json({status:"success",data:productUpdate});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });
// router.delete("/:prodId", async(req,res)=>{
//     try {
//         const prodId = req.params.prodId;
//         const product = await productsService.deleteProduct(prodId);
//         res.json({status:"success",data:product});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });

