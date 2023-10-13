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
            console.log("addProduct",error.message);
            // para el usuario
            throw new Error("Imposible crear el producto");
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
            console.log(cart)
            if(cart){
                const {products} = cart;
                const prodExist = products.find((prod)=>prod.productId._id == productId);
                if(prodExist){
                    // si el producto existe se borra
                    const modifyCart= cart.products.filter((prod )=> prod.productId._id != productId);
                    cart.products= modifyCart;
                    const result =await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                    return result
                }else{
                    console.log(error.message);
                    throw new Error ("no se pudo encontrar el producto")    
                }
                
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
    
};
