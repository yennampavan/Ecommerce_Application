import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';


//protected routed token base
export const requireSignIn = async(req,res,next)=>{
        
    try {
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

//admin access
export const isAdmin= async (req,res,next)=>{
    try {   
        const user = await userModel.findById(req.user._id);
        if(user.role!==1){
            return res.status(200).send({
                success:false,
                message:'unAuthorization access'
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:'error in admin middieware',
            error
        })
        
    }
}
