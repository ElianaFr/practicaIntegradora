// const addToCart=(productId)=>{
//     console.log(productId)
// }
const addToCart= async (productId) => {
    //id del carrito al que voy agregarle el producto 
    let cartId = "6525e2b9fbc880249bbc09bc";
    if(!cartId){
        console.log("no existe el carrito");
        return;
    }
    const response = await fetch (`/api/carts/${cartId}/product/${productId}`,{
        method: 'PUT',
    });
    if(response.status===200){
        alert('producto agregado al carrito');
        console.log('producto agregado al carrito');
    }else{
        console.log('error al agregar el producto')
    }
};
