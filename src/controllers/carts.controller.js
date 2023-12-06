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
    static addProductToCart = async (req,res)=>{
        try {
            const {cid:cartId, pid:productId} = req.params;
            const cart = await CartsService.getCartById(cartId);   
            const result = await CartsService.addProductToCart(cartId, productId);
            res.json({status:"success", result});    
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
            const cart = await CartsService.getCartById(cartId);
            const result = await CartsService.updateProdCart(cartId,productId,newQuantity);
            res.json({status:"success",result});
        } catch (error) {
            res.status(404).json({status:"error",message:error.message});
        }
    };
    static purchaseCart = async (req,res)=>{
        try {
                    const {cid: cartId} = req.params;
                    const cart = await CartsService.getCartById(cartId);
                    // verificar stock
                    if(cart.products.length){
                        const ticketProducts = [];
                        const rejectedProducts = [];
                        for (let i = 0; i < cart.products.length; i++) {
                            // datos prod
                            const cartProduct = cart.products[i];
                            const productInfo = cartProduct.productId;
                            // cantidad - stock
                            if (cartProduct.quantity <= productInfo.stock) {
                                ticketProducts.push(cartProduct);
                                productInfo.stock -= cartProduct.quantity;
                            } else {
                                rejectedProducts.push(cartProduct);
                            }
                        };
                        console.log("ticketProducts", ticketProducts);
                        console.log("rejectedProducts", rejectedProducts);
        
                        let total = 0;
                        for (let i = 0; i < ticketProducts.length; i++) {
                            total += ticketProducts[i].productId.price * ticketProducts[i].quantity;
                        };
        
                        // crear ticket en bd
                        if(ticketProducts.length >= 1){
                            const newTicket = {
                                code: uuidv4(),
                                purchaseDateTime: new Date(),
                                amount: total,
                                purcharser: req.user.email //El comprador, el usuario
                            };
        
                            const ticket = await TicketsService.createTicket(newTicket);
                            console.log("New Ticket", ticket);
                        };
        
                        // Actualizar el carrito con productos cancelados
                        if(rejectedProducts.length >= 1 && ticketProducts.length >= 1){
                            for (let i = 0; i < ticketProducts.length; i++) {
                                // Datos prod
                                let sellProduct = ticketProducts[i];
                                let productId = sellProduct.productId._id;
                                // Stock
                                let stock = sellProduct.productId.stock;
                                
                                console.log("carrito",cartId);
                                console.log("id",productId);
                                await ProductsService.updatedProduct(productId, stock);
            
                                // Eliminar 
                                await CartsService.deleteProduct(cartId, productId)
                            };
        
                            res.json({status: "success", message: "Compra Realizada, algunos productos no se pudieron comprar por falta de stock:", rejectedProducts})
                        } else if(rejectedProducts.length >= 1 && ticketProducts.length == 0){
                            res.json({status: "error", message: "No es posible concretar la venta, algunos productos tienen falta de stock:", rejectedProducts})
                        } else {
                            for (let i = 0; i < ticketProducts.length; i++) {
                                // Datos prod
                                let sellProduct = ticketProducts[i];
                                let productId = sellProduct.productId._id;
                                // Stock
                                let stock = sellProduct.productId.stock;
                                
                                await ProductsService.updatedProduct(productId, stock);
            
                                // Eliminar prod
                                await CartsService.deleteProduct(cartId, productId)
                            };
                            console.log(`Carrito con ID ${cartId} vacio, ya que se vendieron todos los productos. \nIngresa nuevos productos`);
                            res.json({status: "success", message: "Compra Realizada", ticketProducts})
                        };
                    } else {
                        res.json({status: "error", message: "El carrito está vacio"})
                    }
        } catch (error) {
            res.json({error:error.message})
        }
    }
    
};