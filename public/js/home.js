const url = 'http://localhost:8080';

const createCart = async () => {
    const newCartResponse = await fetch('http://localhost:8080/api/carts/', {
        method: 'POST',
    });

    const result = await newCartResponse.json();
    currentCartId = result.data._id;
    console.log('Nuevo carrito creado con ID:', currentCartId);
    return currentCartId;
};

const addToCart = async (productId) => {
    if (!currentCartId) {
        await createCart();
    }

    // Agrega el producto al carrito utilizando el ID del carrito actual
    await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
        method: 'POST',
    });

    console.log('Producto agregado al carrito con ID:', currentCartId);
    return currentCartId;
};

const deleteToCart = async (productId) => {
    if (currentCartId && productId) {
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Producto eliminado del carrito correctamente.');
                window.location.reload(); 
            } else {
                console.error('Error al eliminar el producto del carrito.');
            }
    
        } catch (error) {
            console.error('Error de red o servidor al eliminar el producto del carrito:', error);
        }
    } else {
        console.error('No se proporcionó un ID de carrito o ID de producto válido.');
    }
};

// function addToCart(pid) {
//     console.log(pid);
//     let cartId = "6525e2b9fbc880249bbc09bc";
//     if(!cartId){
//         console.log("no existe el carrito");
//         return;
//     }
    
//     alert("el id:" , pid)
//     const options = {
//         method: 'POST',
//         body: JSON.stringify({quantity: 1})
//     }
//     fetch(`${url}/api/carts/${cartId}/products/${pid}`, options)
//     .then(function(response){
//         if (response.status === 200){
//             alert('Producto Agregado');
//         };
//     });
// };

