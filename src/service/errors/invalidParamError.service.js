export const productParamError = (product) => {
    return `
        El ID producto debe ser un dato alfanumérico, pero se recibio ${product._id}
    `
};