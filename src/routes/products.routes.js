import { Router } from "express";
import { productsService } from "../dao/index.js";
import mongoose from "mongoose";

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const products = await productsService.getProducts();
        res.json({status:"success",data:products});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.get("/:prodId", async(req,res)=>{
    try {
        const prodId = req.params.prodId;
        const product = await productsService.getProductsById(prodId);
        res.json({status:"success",data:product});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.post("/", async(req,res)=>{
    try {
        const product = req.body;
        const productsList = await productsService.addProduct(product);
        res.json({status:"success",data:productsList});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.put("/:prodId", async(req,res)=>{
    try {
        const product = req.body;
        const prodId = req.params.prodId
        const productUpdate = await productsService.updateProduct(prodId,product);
        res.json({status:"success",data:productUpdate});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.delete("/:prodId", async(req,res)=>{
    try {
        const prodId = req.params.prodId;
        const product = await productsService.deleteProduct(prodId);
        res.json({status:"success",data:product});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});



export {router as productsRouter}


