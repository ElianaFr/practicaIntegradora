// importamos el modelo creado en products.model
import { productsModel } from "./models/products.model.js";

export class ProductManagerMongo{
    constructor(){
        // crea una propiedad dentro de la clase que sera el modelo
        // le indicamos el modelo de productos
        this.model = productsModel;
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
    async getProductsById(id){
        try {
            const product = await this.model.findById(id);
            return product;
        } catch (error) {
            // por consola
            console.log("getProductById",error.message);
            // para el usuario
            throw new Error("Imposible encontrar el producto");
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
    async updateProduct(id,updateInfo){
        try {
            // este metodo si no encuentra el id tiene undefined como resultado
            // se hace una condicion si arroja ese resultado
            // el tercer parametro va a mostrar la lista de prod actualizada
            const product = await this.model.findByIdAndUpdate(id,updateInfo,{new:true});
            if(!product){
                throw new Error("No se encontro el producto")    
            }
                return product;
        } catch (error) {
            // por consola
            console.log("updateProduct",error.message);
            // para el usuario
            throw new Error("Imposible actualizar el producto");
        }
    };
};
