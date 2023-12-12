export const productCreateError = (product) => {
    return `
        Todos los campos son obligatorios,
        Listado de Campos Obligatorios: 

        title: Tipo String, y se recibio ${product.title}.
        description: Tipo String, y se recibio ${product.description}.
        price: Tipo Number, y se recibio ${product.price}.
        stock: Tipo Number, y se recibio ${product.stock}.
        code: Tipo String, y se recibio ${product.code}.
        thumbnail: Tipo String, y se recibio ${product.thumbnail}.
        category: Tipo String, y se recibio ${product.category}.
    `
};