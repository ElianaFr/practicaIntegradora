export const checkRole = (roles)=>{
    return (req,res,next)=>{
        console.log(req.user);
        if(!roles.includes(req.user.role)){
            res.json({status:"error",message:"No tenes los permisos para continuar"})
        }else{
            next();    
        };
        
    };
};