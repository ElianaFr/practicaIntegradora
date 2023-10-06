// importamos el modelo creado en products.model
import { productsModel } from "./models/products.model";

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
            console.log(error.message);
            // para el usuario
            throw new Error("Imposible crear el producto");
        }
    };




    async getProducts(){};
    
    async getProductsById(id){};
    async deleteProduct(id){};
    async updateProduct(id,product){};
};
