import JWT from "jsonwebtoken";
import userModel from "../models/userModels.js";

//Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };


// Middleware to verify JWT token
export const requireSignIn = async (req, res, next) => {
  try {
    // Extract JWT token from the Authorization header
    const token = req.headers.authorization;

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "JWT token is missing",
      });
    }

    // Verify JWT token using the JWT_SECRET
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user data from decoded token to the request object
    req.user = decoded;

    // Call next middleware
    next();
  } catch (error) {
    // Handle token verification errors
    console.error("JWT token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid JWT token",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};


// import JWT from "jsonwebtoken";
// import userModel from "../models/userModels.js";

// //Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// //admin acceess
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     if (user.role !== 1) {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middelware",
//     });
//   }
// };