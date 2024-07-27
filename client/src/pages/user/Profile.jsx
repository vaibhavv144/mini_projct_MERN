import React, { useState, useEffect } from "react";
import Layout from '../../component/La/Layout'
import UserMenu from '../../component/La/UserMenu'
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from 'axios'



const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
//state
  const [name,setName] = useState("")
  const [email,setEmail]= useState("")
  const [phone,setPhone]= useState("")
  const [address,setAddress]= useState("")
  const [password,setPassword]= useState("");

  //get user dta
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);


   // form function
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`https://mini-projct-mern.onrender.com/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
 



  return (
    <Layout title={"Your Profile"}>
    <div
      className="container-fluid m-3 p-3"
      style={{
        backgroundImage: "url('your-image-url.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "calc(100vh - 120px)", // Adjust the height to exclude the header and footer
      }}
    >
      <div className="flex justify-between">
        <div className="w-1/4">
          <UserMenu />
        </div>
        <div className="w-3/4">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="title text-center">USER PROFILE</h4>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="exampleInputName"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  disabled
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Address"
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  

  )
}

export default Profile
