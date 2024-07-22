import slugify from "slugify"
import CateogryModels from "../models/CateogryModels.js"
import productModels from "../models/productModels.js"

export const createCategoryController = async(req ,res) =>{
    try {
        const {name} = req.body
        if(!name){
            res.status(401).send({
                message:"Name is required"
            })
        }
        const existingCategory =await CateogryModels.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category already exists"
            })
        }
        const category = await new CateogryModels({name, slug:slugify(name)}).save()
        res.status(200).send({
            success:true,
            message:"Category created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in category'
        })
        
    }

};
//updte ctrgy cntrlr

export const updateCategoryController = async(req, res) =>{
    try {
        const {name} = req.body
        const{id} = req.params
        const category = await CateogryModels.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }

}
//gt all ctgry
// export const categoryController= async (req, res)=>{
//     try {
//         const category = await CateogryModels.find({});
//         res.status(200).send({
//             success:true,
//             message:"All category list",
//             category
//         })
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error while getting all catgeory",
//             error
//         })
//     }


// };

export const categoryController = async (req, res) => {
  try {
    const categories = await CateogryModels.find({}).lean();

    for (const category of categories) {
      const products = await productModels.find({ category: category._id }).limit(1).lean();
      category.products = products;
    }

    res.status(200).send({
      success: true,
      message: "All category list",
      categories
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      error
    });
  }
};
//single category
export const singleCategoryController= async(req, res)=>{
    try {
        const category = await CateogryModels.findOne({slug: req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get single category successfully",
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single category"
        })
        
    }
};
//delet ctgry ctrlr
export const deleteCategoryController = async(req, res) =>{
    try {
        const{id} = req.params
       await CateogryModels.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Deletd successfully",
            
        })
    } catch (error) {
         console.log(error)
         res.status(500).send({
            success:false,
            message:"Error in deleting category"
         })
        
    }
}