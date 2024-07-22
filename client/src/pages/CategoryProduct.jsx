import React, { useState, useEffect } from "react";
import Layout from "../component/La/Layout";
import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // const [cart, setCart] = useCart();

  // useEffect(() => {
  //   if (params?.slug) getPrductsByCat();
  // }, [params?.slug]);
  // const getPrductsByCat = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:8080/api/v1/product/product-category/${params.slug}`
  //     );
  //     setProducts(data?.products);
  //     setCategory(data?.category);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const getPrductsByCat = async () => {
      try {
        if (params?.slug) {
          const { data } = await axios.get(
            `http://localhost:8080/api/v1/product/product-category/${params.slug}`
          );
          setProducts(data?.products);
          setCategory(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPrductsByCat(); // Call the function directly inside useEffect

    // No dependencies needed for getPrductsByCat here
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {p.price}</p>
                    <button
                      className="btn btn-primary ms-1 mb-2 mt-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full dark:hover:text-white"
                      //  onClick={() => {
                      //   setCart([...cart, p]);
                      //   localStorage.setItem(
                      //     "cart",
                      //     JSON.stringify([...cart, p])
                      //   );
                      //   toast.success("Item Added to Cart");
                      // }}
                      >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;



// import React, { useState, useEffect } from "react";
// import Layout from "../component/La/Layout";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";
// import axios from "axios";

// const CategoryProduct = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [cart, setCart] = useCart();

//   useEffect(() => {
//     if (params?.slug) getPrductsByCat();
//   }, [params?.slug]);

//   const getPrductsByCat = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8080/api/v1/product/product-category/${params.slug}`
//       );
//       setProducts(data?.products);
//       setCategory(data?.category);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddToCart = (product) => {
//     try {
//       const updatedCart = [...cart, product];
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       toast.success("Item Added to Cart");
//     } catch (e) {
//       if (e.name === 'QuotaExceededError') {
//         toast.error("Cart storage limit exceeded. Cannot add more items.");
//       } else {
//         toast.error("An error occurred while adding the item to the cart.");
//       }
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mt-3">
//         <h4 className="text-center">Category - {category?.name}</h4>
//         <h6 className="text-center">{products?.length} result found</h6>
//         <div className="row">
//           <div className="col-md-9 offset-1">
//             <div className="d-flex flex-wrap">
//               {products?.map((p) => (
//                 <div
//                   className="card m-2"
//                   style={{ width: "18rem" }}
//                   key={p._id}
//                 >
//                   <img
//                     src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">
//                       {p.description.substring(0, 30)}...
//                     </p>
//                     <p className="card-text"> $ {p.price}</p>
//                     <button
//                       className="btn btn-primary ms-1 mb-2 mt-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                     >
//                       More Details
//                     </button>
//                     <button
//                       className="btn btn-secondary ms-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full dark:hover:text-white"
//                       onClick={() => handleAddToCart(p)}
//                     >
//                       ADD TO CART
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CategoryProduct;
