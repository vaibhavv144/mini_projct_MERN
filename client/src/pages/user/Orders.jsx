
// import Layout from '../../component/La/Layout'
// import UserMenu from '../../component/La/UserMenu'


// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import { useAuth } from "../../context/auth";
// import moment from "moment";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get(`https://mini-projct-mern.onrender.com/api/v1/auth/orders`);
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);
//   return (
//     <Layout title={"Your Orders"}>
//       <div className="container-fluid p-3 m-3 dashboard">
//   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//     <div className="md:col-span-1">
//       <UserMenu />
//     </div>
//     <div className="md:col-span-3">
//       <h1 className=" mb-4 text-center font-bold text-lg mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300">All Orders</h1>
//       {orders?.map((o, i) => (
//         <div key={i} className="border shadow">
//           <table className="table-auto w-full">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">#</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Buyer</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Payment</th>
//                 <th className="px-4 py-2">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="px-4 py-2">#</td>
//                 <td className="px-4 py-2">Status</td>
//                 <td className="px-4 py-2">Buyer</td>
//                 <td className="px-4 py-2">Date</td>
//                 <td className="px-4 py-2">Payment</td>
//                 <td className="px-4 py-2">Quantity</td>
//               </tr>
//             </tbody>
//           </table>
//           <div className="container">
//             {o?.products?.map((p, j) => (
//               <div key={j} className="flex-row mb-2 p-3 card">
//                 <div className="w-1/3">
//                   <img
//                     src={`https://restaurant-website.up.railway.app
//                     /api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                 </div>
//                 <div className="w-2/3">
//                   <p>{p.name}</p>
//                   <p>{p.description.substring(0, 30)}</p>
//                   <p>Price: {p.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//     </Layout>
//   );
// };

// export default Orders;



import Layout from '../../component/La/Layout';
import UserMenu from '../../component/La/UserMenu';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`https://mini-projct-mern.onrender.com/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <UserMenu />
          </div>
          <div className="md:col-span-3">
            <h1 className="mb-4 text-center font-bold text-lg mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full dark:hover:bg-gray-800 transition duration-300">
              All Orders
            </h1>
            {orders?.map((o, i) => (
              <div key={i} className="border shadow mb-4 p-4">
                <table className="table-auto w-full mb-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Details</th>
                      {/* <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Buyer</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Payment</th>
                      <th className="px-4 py-2">Quantity</th> */}
                    </tr>
                  </thead>
                  
                </table>
                <div className="flex flex-wrap">
                  {o?.products?.map((p, j) => (
                    <div key={j} className="flex mb-4 p-3 bg-white rounded-lg shadow-md w-full md:w-1/3 ml-72">
                      <div className="w-1/3 ">
                        <img
                          src={`https://mini-projct-mern.onrender.com/api/v1/product/product-photo/${p._id}`}
                          className="object-cover w-full h-24 rounded"
                          alt={p.name}
                        />
                      </div>
                      <div className="w-2/3 pl-4">
                        <p className="font-semibold">{p.name}</p>
                        <p>{p.description.substring(0, 30)}...</p>
                        <p>Price: ₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
