import React, { useState } from "react";
import Layout from "../../component/La/Layout";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate} from "react-router-dom";

// import { useAuth } from "../../context/auth";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  // const [auth, setAuth] = useAuth();
  // const location = useLocation();
//   const handlePasswordChange = (e) => {
//     const Password = e.target.value;
//     setNewPassword(Password);
//   };
  const handleSubmit = async (e) => {
      e.preventDefault();
    const Password = e.target.value;
    setNewPassword(Password);
      try {

        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        const hasRequiredLength = newPassword.length >= 6;
     
        if (!hasUpperCase || !hasSpecialChar || !hasRequiredLength) {
          toast.error("Password must contain at least 6 characters, one special character, and one capital letter.");
          return;
        }
          const res = await axios.post(`https://mini-projct-mern.onrender.com/api/v1/auth/forgot-password`, 
          { email, newPassword,answer });

          if (res && res.data.success) {
              toast.success(res.data.message);
             navigate('/login');
             toast.success("Password reset successfully!",{ duration: 5000 });
          } else {
              toast.error(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
      }
  };


  return (
    <Layout title={'Forget Password-Ecommerce App'}>
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="form-container max-w-md w-full p-4 bg-white rounded-lg shadow-lg hover:shadow-xl">
      
      <h4 className="title text-center text-2xl font-bold mb-4">RESET PASSWORD</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            id="exampleInputEmail1"
            placeholder="Enter your Email"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            id="exampleInputPlaceOfBirth"
            placeholder="Enter Your Place Of Birth"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            id="exampleInputPassword"
            placeholder="Enter Your New Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          RESET
        </button>
      </form>
    </div>
  </div>
</Layout>

  )
}

export default ForgotPassword
