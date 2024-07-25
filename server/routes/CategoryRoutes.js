import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";


const router = express.Router()


//crete ctgry routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);


//updte ctgry route
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

// get all ctrgy   
router.get('/get-category',categoryController);
// sngl ctrgy
router.get("/single-category/:slug", singleCategoryController)
// dlte ctgry
router.delete("/delete-category/:id", requireSignIn,isAdmin,deleteCategoryController)
export default router;