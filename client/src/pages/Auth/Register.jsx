import React from "react";
import Layout from "../../component/La/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail]= useState("")
    const [phone,setPhone]= useState("")
    const [address,setAddress]= useState("")
    const [password,setPassword]= useState("");
    const [answer,setAnswer]= useState("");
   const navigate =useNavigate();


const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
const handleSubmit = async (e) =>{
    e.preventDefault()
try {

   // Validation checks
   const hasUpperCase = /[A-Z]/.test(password);
   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
   const hasRequiredLength = password.length >= 6;

   if (!hasUpperCase || !hasSpecialChar || !hasRequiredLength) {
     toast.error("Password must contain at least 6 characters, one special character, and one capital letter.");
     return;
   }
    const res = await axios.post(`http://localhost:8080/api/v1/auth/register`,
    {name,phone,email,password,address,answer});

    if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/login')
        toast.success("Resgitered successfully!", { duration: 5000 });
    }
    else{
        toast.error(res.data.message);
    }

} catch (error) {
    console.log(error);
    toast.error("something went wrong");
    
}
    
};

  console.log(process.env.REACT_APP_API);
  return (
    <Layout title={"Register Page"}>
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url('https://t3.ftcdn.net/jpg/01/18/17/56/360_F_118175611_OsvC8zMXkPEVXxHy39zAv9HRkY89l25z.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg hover:shadow-xl">
          <h4 className="text-center text-2xl font-bold mb-4">REGISTER FORM</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="exampleInputName"
                placeholder="Enter your Name"
                required
              />
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="exampleInputPassword"
                placeholder="Enter your Password"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="exampleInputPhone"
                placeholder="Enter your Phone"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="exampleInputAddress"
                placeholder="Enter your Address"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="exampleInputAnswer"
                placeholder="What is your place of birth?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              // onClick={() => {
              //   navigate('/login');
              // }}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;