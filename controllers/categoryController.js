import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create category",
      error
    });
  }
};


export const updateCategoryController = async(req, res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:'category updates successfully',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in update category',
            error
        })
        
    }
}

//get all categories>
export const categoryController= async (req,res)=>{
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All category list',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error while getting all categgories',
            error
        })
    }

}

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};