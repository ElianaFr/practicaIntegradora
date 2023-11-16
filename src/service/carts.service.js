import { cartsDao } from "../dao/index.js";

export class CartsService{
    static createCart = ()=>{
        return cartsDao.createCart();
    };
    static getCarts = ()=>{
        return cartsDao.getCart();
    };
    static getCartById = (cartId)=>{
        return cartsDao.getCartById(cartId);
    }
    static addProduct = (cartId,productId)=>{
        return cartsDao.addProduct(cartId,productId);
    };
    static deleteProdCart = (cartId,productId)=>{
        return cartsDao.deleteProduct(cartId,productId);
    };
    static deleteCart = (cartId)=>{
        return cartsDao.deleteProdCart(cartId);
    };
    static updateProdCart = (cartId,productId,newQuantity)=>{
        return cartsDao.updateProdCart(cartId,productId,newQuantity);
    }
}