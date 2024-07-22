import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import orderModel from "../models/orderModel.js";
import userModels from "../models/userModels.js";
import JWT from 'jsonwebtoken';


export const registerController = async (req, res) => {
 
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message : "Name is required" });
    }
    if (!email) {
      return res.send({ message : "Email is required" });
    }
    if (!password) {
      return res.send({ message : "Password is required" });
    }
    if (!phone) {
      return res.send({ message : "Phone is required" });
    }
    if (!address) {
      return res.send({ message : "Address is required" });
    }
    if (!answer) {
      return res.send({ message : "Answer is required" });
    }
    //exstng usr
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //rgstr usr
    const hashedPassword = await hashPassword(password);
    //sve
    const user = await new userModels({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      successful: false,
      message: "Error in registration",
      error,
    });
  }
};
//POST lgin
export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validtn
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
        success:true,
        message:'Login successfully',
        user:{
            name: user.name,
            email:user.email,
            phone:user.phone,
            address: user.address,
            role: user.role
        },
        token,
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
//frgt pswrd ctrl
export const forgetPasswordController =async (req,res)=>{
  try {
    const {email,answer,newPassword} = req.body
    if(!email){
      res.status(400).send({message:"Email is required"})
    };
    if(!answer){
      res.status(400).send({message:"Answer is required is required"})
    };
    if(!newPassword){
      res.status(400).send({message:"New Password is required"})
    }
//check
const user = await userModels.findOne({email,answer})
if(!user){
  return res.status(400).send({
    success:false,
    message:"Wrong Email or Answer"
  })
}
const hashed = await hashPassword(newPassword)
await userModels.findByIdAndUpdate(user._id,{password:hashed})
res.status(200).send({
  success:true,
  message:"Password Reset Successfully",
})
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'something went wrong',
      error
    })
    

    
  }

}

//tst cntrler
export const testController = async (req, res)=>{
    res.send('Protected route')
}
//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModels.findById(req.user._id);
    //profile password updte
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModels.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  };
 

};
//ordrs
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 })
      .exec(); // Add exec() to execute the query

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error: error.message, // Send error message for better debugging
    });
  }
};
//orderupddate
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
