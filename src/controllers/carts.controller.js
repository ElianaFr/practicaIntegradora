import { CartsService } from "../service/carts.service.js";
// import { cartsService } from "../dao/index.js";

export class CartsController {
    
    static getCarts =async (req,res)=>{
        try {
            const carts = await CartsService.getCarts()
            res.json({status:"success",carts});
        } catch (error) {
            res.status(404).json({status:"error",message:error.message})
        }
    };
    static getCartById = async (req,res)=>{
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            res.json(cart);
        } catch (error) {
            res.status(404).json({status:"error",message:error.message});
        }
    };
    static createCart = async (req,res)=>{
        try {
            const createCart = await CartsService.createCart();
            res.json({status:"success",createCart})
        } catch (error) {
            res.status(404).json({status:"error",message:error.message});
        }
    };
    static deleteProdCart = async(req,res) =>{
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await CartsService.deleteProdCart(cartId,productId);
            res.json({status:"success",cart});
        } catch (error) {
            res.status(404).json({status:"error",message:error.message});
        }
    };
    static deleteCart = async(req,res) =>{
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.deleteCart(cartId);
            res.json({status:"success",cart});
        } catch (error) {
            res.status(404).json({status:"error",message:error.message});
        }
    };
    static updateCart = async (req,res)=>{
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const {newQuantity} = req.body; 
            const cart = await CartsService.updateProdCart(cartId,productId,newQuantity);
            res.json({status:"success",cart});
        } catch (error) {
            res.status(404).json({status:"error",message:error.message});
        }
    };
    
};