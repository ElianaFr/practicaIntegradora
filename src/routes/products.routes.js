import { Router } from "express";
import { productsService } from "../dao/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const products = await productsService.getProducts();
        res.json({status:"success",data:products});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.get("/:prodId", async(req,res)=>{
    try {
        const prodId = req.params.prodId;
        const product = await productsService.getProductsById(prodId);
        res.json({status:"success",data:product});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.post("/", async(req,res)=>{
    try {
        const product = req.body;
        const productsList = await productsService.addProduct(product);
        res.json({status:"success",data:productsList});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.put("/:prodId", async(req,res)=>{
    try {
        const product = req.body;
        const prodId = req.params.prodId
        const productUpdate = await productsService.updateProduct(prodId,product);
        res.json({status:"success",data:productUpdate});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
router.delete("/:prodId", async(req,res)=>{
    try {
        const prodId = req.params.prodId;
        const product = await productsService.deleteProduct(prodId);
        res.json({status:"success",data:product});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});



export {router as productsRouter}




// // cargar un nuevo producto /api/products
// // se agrega poder cargar imagenes
// router.post("/",uploader.single("thumbnail"), async (req,res)=>{
//     try {
//         // toma la info del formulario
//         const productAdd = req.body;
//         console.log("info desde el formulario",productAdd);
//         console.log("info de la imagen subida",req.file);
//         productAdd.thumbnail = req.file.filename
//         const add = await productsService.addProduct(productAdd);
//         console.log("Peticion recibida")
//         res.json({data:"producto creado"})
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message})
        
//     }
// });
// // localhost:8080/api/products con query
// router.get("/", async (req,res)=>{
//     try {
//         const products = await productsService.getProducts();
//         const limit = parseInt(req.query.limit);
//         if(limit){
// // slice devuelve una porcion del arreglo// en primer lugar es desde donde empieza a contar
// // segundo paso la variable que me va a ingresar el usuario
//         const productsLimit = products.slice(0,limit);
//             res.json({limit:productsLimit})
//         }else{
//             res.json(products);
//         }
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//         // res.json({status:"error",message:error.message});
//     }
// });
// // localhost:8080/api/products/:pid
// router.get("/:pid",async(req,res)=>{
//     try {
//         const id = parseInt(req.params.pid);
//         const productId =  await productsService.getProductById(id);
//         res.json({data:productId})
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//         // res.json({status:"error",message:error.message});
//     }
    
// });
// // api/products/:pid (modificar un producto)
// router.put("/:pid", async (req,res)=>{
//     try {
//         const updateId  = parseInt(req.params.pid);
//         const newInfo = req.body;
//         const prodUpdate= await productsService.updateProduct(updateId,newInfo);
//         console.log("Peticion recibida,producto actualizado")
//         res.json(prodUpdate);
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });
// // api/products/:pid (eliminar producto)
// router.delete("/:pid", async (req,res)=>{
//     try {
//         const deleteId = parseInt(req.params.pid);
//         const newList = await productsService.deleteProduct(deleteId);
//         console.log("Peticion recibida, eliminar producto")
//         res.json(newList)
//     } catch (error) {
//         res.status(404).json({status:"error",message:error.message});
//     }
// });


