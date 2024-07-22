
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useCategory from "../hooks/useCategories";
// import Layout from "../component/La/Layout";


// const Categories = () => {
//   const categories = useCategory();
//   return (
//     <Layout className title={"All Categories"}>
//   <div className=" mx-0 my-0 p-10 bg-slate-600 w-full h-96 ">
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-0 my-0 w-full ">
//     {categories.map((c) => (
//       <div className="mt-5 mb-3 " key={c._id}>
//         {/* <img src={`http://localhost:8080/api/v1/product/product-photo/${c._id}`}
//         /> */}
//         <Link to={`/category/${c.slug}`} className="inline-block  bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full">
//           {c.name}
//         </Link>
//       </div>
//     ))}
//   </div>
// </div>
    

//     </Layout>
    
//   );
// };

// export default Categories;



// import React from "react";
// import { Link } from "react-router-dom";
// import useCategory from "../hooks/useCategories";
// import Layout from "../component/La/Layout";

// const Categories = () => {
//   const categories = useCategory();

//   return (
//     <Layout className title={"All Categories"}>
//       <div className="mx-0 my-0 p-10 bg-slate-600 w-full h-96">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-0 my-0 w-full">
//           {categories.map((c) => (
//             <div className="mt-5 mb-3" key={c._id}>
//               {c.products && c.products.length > 0 && (
//                 <img
//                   src={`data:${c.products[0].photo.contentType};base64,${c.products[0].photo.data.toString('base64')}`}
//                   alt={c.products[0].name}
//                   className="w-48 h-48 "
//                 />
//               )}
//               <Link
//                 to={`/category/${c.slug}`}
//                 className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full mt-2"
//               >
//                 {c.name}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Categories;


import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategories";
import Layout from "../component/La/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout className title={"All Categories"}>
      <div className="p-10 bg-slate-600 w-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div key={c._id} className="bg-white p-5 rounded-lg shadow-lg">
              {c.products && c.products.length > 0 && (
                <img
                  src={`data:${c.products[0].photo.contentType};base64,${c.products[0].photo.data.toString('base64')}`}
                  alt={c.products[0].name}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <Link
                to={`/category/${c.slug}`}
                className="block bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-4 rounded-full mt-4"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
