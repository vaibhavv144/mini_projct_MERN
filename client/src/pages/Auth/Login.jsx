import React, { useState } from "react";
import Layout from "../../component/La/Layout";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
// import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { email, password });

            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 5000 });
                // toast.success("Password reset successful!", { duration: 5000 });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state||'/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Login Page"}>
        <div className="relative ">
  <div
    className="flex justify-center items-center "
    style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "calc(80vh - 100px)", // Adjust the height to exclude the header and footer
    }}
  >
    <div className="form-container max-w-md w-full p-4 rounded-lg shadow-lg"> {/* Removed bg-white class */}
      <h4 className="w-full text-center font-bold text-lg mt-2 bg-blue-600 hover:bg-gray-400 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">LOGIN FORM</h4>
      <form onSubmit={handleSubmit}>
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
          <button
            type="button"
            className="w-full text-center font-bold text-lg mt-2 bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={() => {
              navigate('/forgot-password');
            }}
          >
            Forgot Password
          </button>
        </div>
        <button
          type="submit"
          className="w-full text-center font-bold text-lg mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline "
          // onClick={() => {
          //   navigate('/homepage');
          // }}
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
</div>

      </Layout>
      

    );
};

export default Login;
