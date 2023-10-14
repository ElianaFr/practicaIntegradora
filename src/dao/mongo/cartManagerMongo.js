// importo el modelo creado en carts.models
import { cartsModel } from "./models/carts.model.js";

export class CartManagerMongo{
    constructor(){
        this.model = cartsModel;
    }
    async createCart(){
        try {
            const newCart ={};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            // por consola
            console.log("createCart",error.message);
            // para el usuario
            throw new Error("Imposible crear el carrito");
        }
    };
    async getCart(){
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            // por consola
            console.log("getCarts",error.message);
            // para el usuario
            throw new Error("Imposible cargar carrito");
        }
    };
    async getCartById(cartId){
        try {
            const cart = await this.model.findById(cartId).populate("products.productId").lean();
            
            if(!cart){
                throw new Error ("El carrito no existe")
            };
            return cart;
        } catch (error) {
            console.log("getCartById",error.message)
            throw new Error ("No se pudo cargar el carrito")
        }
    }
    async addProduct(cartId, productId){
        try {
            let quantity = 1;
            const cart = await this.model.findById(cartId);
            if(cart){
                const {products} = cart;
                const prodExist = products.find((prod)=>prod.productId == productId);
                if(prodExist){
                    prodExist.quantity += quantity;
                }else{
                    cart.products.push({productId: productId, quantity: quantity});
                }
                const result =await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            }else{
                throw new Error("Carrito no encontrado");
            }
        } catch (error) {
            // por consola
            console.log("addProduct",error.message);
            // para el usuario
            throw new Error("Imposible agregar el producto al carrito");
        }
    };
    async deleteProduct(cartId, productId){
        try {
            const cart = await this.model.findById(cartId);
            const prodExist = cart.products.find((prod)=>prod.productId._id == productId);
            if(prodExist){
                const newProducts= cart.products.filter(prod=> prod.productId._id != productId);
                cart.products= newProducts;
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                return result;
                }else{
                    throw new Error ("No se pudo encontrar el producto porque no ha sido agregado")    
                }
        } catch (error) {
            // por consola
            console.log("deleteProduct",error.message);
            // para el usuario
            throw new Error("Imposible encontrar el carrito");
        }
    };
    async deleteProdCart(cartId){
        try {
            const cart = await this.model.findById(cartId);
            if (cart.products.length > 0){
                const newProducts= [];
                cart.products= newProducts;
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                return result;
            }else{
                throw new Error ("Carrito vacio");    
            };
        }
        catch (error) {
            // por consola
            console.log("deleteProduct",error.message);
            // para el usuario
            throw new Error("Imposible encontrar el carrito");
        }
    };
    async updateProdCart (cartId,productId,newQuantity){
        try {
            const cart = await this.model.findById(cartId);
            const productIndex =  cart.products.findIndex(e=>e.productId == productId);
            if (productIndex >= 0){
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            }else{
                throw new Error ("el producto no se puede actualizar")
            }
        } catch (error) {
            // por consola
            console.log("upgradeProduct",error.message);
            // para el usuario
            throw new Error("Imposible agregar al carrito");
        }
    }
    
};
