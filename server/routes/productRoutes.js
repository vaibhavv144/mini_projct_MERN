import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { brainTreePaymentController, braintreeTokenController, createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productCategoryController, 
    productCountController, 
    productFiltersController, 
    productListController, 
    productPhotoController, 
    realtedProductController, 
    searchProductController, 
    updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//crte prdct route
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
//updte prdct
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
//gt prdct
router.get("/get-product",getProductController)
//gt snlge prdct
router.get("/get-product/:slug",getSingleProductController)
//gt phto
router.get("/product-photo/:pid",productPhotoController)
//dlte prdct
router.delete("/delete-product/:pid",deleteProductController)

//fltr prdcts
router.post("/product-filters/",productFiltersController)

// prdct count 
router.get("/product-count", productCountController);
//prdct list
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);
//
//simialr products
router.get("/related-product/:pid/:cid", realtedProductController);
//ctgry wse prdct
router.get("/product-category/:slug", productCategoryController);
//pymnt routr

//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
export default router;