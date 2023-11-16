// importo los manager de mongo
import { ProductManagerMongo } from "./mongo/productManagerMongo.js";
import { CartManagerMongo } from "./mongo/cartManagerMongo.js";
import {UsersManagerMongo} from "./mongo/usersManagerMongo.js";


const productsDao = new ProductManagerMongo();
const cartsDao = new CartManagerMongo();

const userService = new UsersManagerMongo();

export { productsDao, cartsDao,userService };







// const cartsService = new CartManagerMongo();



// import { ProductManager } from "./productManager.js";
// import { CartManager } from "./cartManager.js";
// import { __dirname } from "../utils.js";
// import path from "path";
// const productsService = new ProductManager(path.join(__dirname,"/files/fileProduct.json"));
// const cartsService = new CartManager(path.join(__dirname,"/files/carts.json"));
// export { productsService, cartsService };
