import express from 'express';
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryCOntroller } from '../controllers/categoryController.js';

const router=express.Router();

//create category
router.post('/create-category',requireSignIn, isAdmin,createCategoryController);

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all
router.get('/get-category',categoryController);
//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);


export default router;  