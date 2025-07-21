import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res ) => {
    try {
        const {name,email, password,phone,address,answer}=req.body;
        //validations
        if(!name){
            return res.send({message:'Name is required'});
        }
        if(!email){
            return res.send({message:'email is required'});
        }
        if(!password){
            return res.send({message:'password is required'});
        }
        if(!phone){
            return res.send({message:'Phone is required'});
        }
        if(!address){
            return res.send({message:'address is required'});
        }
        if(!answer){
            return res.send({message:'answer is required'});
        }

        //existing user
        const existingUser=await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'user already register please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user =await new userModel({name,email,phone,address,answer,password:hashedPassword}).save();
        res.status(201).send({
            success:true,
            message:'user registered sucessfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in registration',
            error
        })
    }
};

// login post
export const loginController=async (req, res)=>{
    try {
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(200).send({
                success:false,
                message:'invalid or password'
            })
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"user not registered "
            })
        }
        const match =await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"invalid password"
            })
        }
        //token
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:'login sucessfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        })
    }
}

//forgot password controller
export const forgotPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body;
        if(!email){
            res.status(200).send({message:'email is required'});
        }
        if(!answer){
            res.status(200).send({message:'answer is required'});
        }
        if(!newPassword){
            res.status(200).send({message:'new Password is required'});
        }
        const user= await userModel.findOne({email,answer});
        if(!user){
            return res.status(200).send({
                success:false,
                message:'wrong email or answer'
            })
        }
        const hashed=await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:'password reset sucessfully..'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'something went wrond',
            error
        })
        
    }
}

export const testController=(req,res)=>{
    res.send('authorization')
}
// export { registerController };
 
