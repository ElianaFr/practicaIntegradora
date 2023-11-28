import { productsDao } from "../dao/index.js";

export class ProductsService {
    static createProducts = (productInfo)=>{
        return productsDao.addProduct(productInfo);
    };
    static getProducts = ()=>{
        return productsDao.getProducts();
    };
    static getProductsById = (id)=>{
        return productsDao.getProductsById(id);
    };
    static deleteProduct = (id)=>{
        return productsDao.deleteProduct(id);
    };
    static updateProduct = (id,updateInfo)=>{
        return productsDao.updateProduct(id,updateInfo);
    };
    static getProductPaginate = (query,options)=>{
        return productsDao.getProductsPaginate(query,options);
    };
    
    
};