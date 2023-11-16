import { ProductsService } from "../service/products.service.js";

export class ProductsController {
    static getProducts = async(req,res)=>{
        try {
            const products = await ProductsService.getProducts();
            
            // const products = await productsService.getProducts();
            res.json({status:"success",data:products});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    static getProductsById = async(req,res)=>{
        try {
            const prodId = req.params.prodId;
            const product = await ProductsService.getProductsById(prodId);
            
            // const product = await productsService.getProductsById(prodId);
            res.json({status:"success",data:product});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    static createProduct = async(req,res)=>{
        try {
            const product = req.body;
            const productsList = await ProductsService.createProducts(product);
            
            // const productsList = await productsService.addProduct(product);
            res.json({status:"success",data:productsList});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    static updateProduct = async(req,res)=>{
        try {
            const product = req.body;
            const prodId = req.params.prodId
            const productUpdate = await ProductsService.updateProduct(prodId,product);
            
            // const productUpdate = await productsService.updateProduct(prodId,product);
            res.json({status:"success",data:productUpdate});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    static deleteProduct = async(req,res)=>{
        try {
            const prodId = req.params.prodId;
            const product = await ProductsService.deleteProduct(prodId);
            
            // const product = await productsService.deleteProduct(prodId);
            res.json({status:"success",data:product});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
}