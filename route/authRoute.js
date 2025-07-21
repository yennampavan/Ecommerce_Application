import express from 'express';
import { registerController,loginController ,testController, forgotPasswordController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();//router obj

//routing
router.post('/register', registerController);  //register  | POST

// /LOGIN POST
router.post('/login',loginController);

//forget password post
router.post('/forgetpassword',forgotPasswordController)

//get
router.get('/test',requireSignIn,isAdmin,testController);

//protected user route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
//protected admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

export default router;
