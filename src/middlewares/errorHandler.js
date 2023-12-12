import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    console.log(error.code);
    switch (error.code){
        case EError.DATABASE_ERROR:
            res.json({status:"Error en base de datos", error: error.cause});
            break;
        case EError.AUTH_ERROR:
                res.json({status:"Error de autenticación ", error: error.cause});
                break;
            
        case EError.INVALID_PARAM:
            res.json({status:"Error Invalid Param", error: error.cause});
            break;
        case EError.INVALID_BODY_JSON:
                res.json({status:"Error Invalid Body Json", error: error.cause});
                break;
    
        default:
            break;
    };
};