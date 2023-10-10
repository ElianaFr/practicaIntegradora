// importo el modelo creado en carts.models
import { cartsModel } from "./models/carts.model.js";

export class CartManagerMongo{
    constructor(){
        this.model = cartsModel;
    }
    async addProduct(productInfo){
        try {
            const product = await this.model.create(productInfo);
            return product;
        } catch (error) {
            // por consola
            console.log("addProduct",error.message);
            // para el usuario
            throw new Error("Imposible crear el producto");
        }
    };
    async getProducts(){
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            // por consola
            console.log("getProducts",error.message);
            // para el usuario
            throw new Error("Imposible cargar los productos");
        }
    };
    async deleteProduct(id){
        try {
            const product = await this.model.findByIdAndDelete(id);
            if(!product){
                throw new Error("No se encontro el producto")    
            }
            return product;
        } catch (error) {
            // por consola
            console.log("deleteProduct",error.message);
            // para el usuario
            throw new Error("Imposible borrar el producto");
        }
    };
};
