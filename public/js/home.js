
const url = 'http://localhost:8080';

function addToCart(pid) {
    console.log(pid);
    let cartId = "6525e2b9fbc880249bbc09bc";
    if(!cartId){
        console.log("no existe el carrito");
        return;
    }
    
    alert("el id:" , pid)
    const options = {
        method: 'POST',
        body: JSON.stringify({quantity: 1})
    }
    fetch(`${url}/api/carts/${cartId}/products/${pid}`, options)
    .then(function(response){
        if (response.status === 200){
            alert('Producto Agregado');
        };
    });
};


// function deleteProductFromCart(pid) {
//   const options = {
//     method: 'DELETE',
//   }
//   fetch(`${url}/api/carts/${cartId}/products/${pid}`, options)
//   .then(function(response){
//     if (response.status === 200){
//       alert('Producto Eliminado');
//     }
//     location.reload();
//   });
// }















// function addToCart(productId) {
//     //id del carrito al que voy agregarle el producto 
//     let cartId = "6525e2b9fbc880249bbc09bc";
//     if(!cartId){
//         console.log("no existe el carrito");
//         return;
//     }
//     fetch (`http://localhost:8080/api/carts/${cartId}/product/${productId}`,{
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({
//             cartId,
//             productId
//         })
//     })
//     .then((response) => response.json())
//     .then((data) => {
//     console.log('Producto agregado al carrito:', data);
//     })
//     .catch((error) => {
//     console.error('Error al agregar el producto al carrito:', error);
//     });
// };






// const addToCart=(productId)=>{
//     console.log(productId)
// }
// const addToCart= async (productId) => {
//     //id del carrito al que voy agregarle el producto 
//     let cartId = "6525e2b9fbc880249bbc09bc";
//     if(!cartId){
//         console.log("no existe el carrito");
//         return;
//     }
//     const response = await fetch (`/api/carts/${cartId}/product/${productId}`,{
//         method: 'PUT',
//     });
//     if(response.status===200){
//         alert('producto agregado al carrito');
//         console.log('producto agregado al carrito');
//     }else{
//         console.log('error al agregar el producto')
//     }
// };
