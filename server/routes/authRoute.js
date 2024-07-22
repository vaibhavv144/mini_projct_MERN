import express from 'express';
import {forgetPasswordController, getAllOrdersController, getOrdersController, logincontroller, orderStatusController, registerController,testController, updateProfileController} from '../controllers/authcontroller.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
//router object
 const router = express.Router()

 //routing
   // regstr -- method POST 
   router.post('/register', registerController);
   //login POST
   router.post('/login',logincontroller);
   //tst routes GET
   router.get('/test',requireSignIn,isAdmin,testController);
  //frgt psswrd
  router.post('/forgot-password',forgetPasswordController);
   //protetctd route auth fr user
  router.get('/user-auth',requireSignIn, (req, res)=>{
    res.status(200).send({ok:true})
  
});
  //protetcted  admin route auth   
router.get('/admin-auth',requireSignIn,isAdmin, (req, res)=>{
    res.status(200).send({ok:true})
  });

  //update profile
router.put("/profile", requireSignIn, updateProfileController);
//ordrs
router.get("/orders", requireSignIn, getOrdersController);
//all orders
router.get("/all-orders", requireSignIn,isAdmin, getAllOrdersController);
// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


   export default router
    
    