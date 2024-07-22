import React, { useState, useEffect } from "react";
import Layout from "../component/La/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";
const ProductDetails = () => {
  // const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial details
  // useEffect(() => {
  //   if (params?.slug) getProduct();
  // }, [params?.slug]);

  // // Get product details
  // const getProduct = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:8080/api/v1/product/get-product/${params.slug}`
  //     );
  //     setProduct(data?.product);
  //     getSimilarProduct(data?.product._id, data?.product.category._id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // Get similar products
  // const getSimilarProduct = async (pid, cid) => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
  //     );
  //     setRelatedProducts(data?.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      } catch (error) {
        console.log(error);
      }
    };

    const getSimilarProduct = async (pid, cid) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mx-auto mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="md:col-span-1">
            <h1 className="text-center font-bold text-2xl mb-8 bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full">
              Product Details
            </h1>
            <h6 className="text-black">Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: ₹ {product.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            {/* <button className="btn btn-secondary mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full transition duration-300"
            >
              ADD TO CART
            </button> */}
          </div>
        </div>
        <hr className="my-4" />
        <h6 className="mb-2 mt-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
          Similar Products
        </h6>
        {relatedProducts.length < 1 && (
          <p className="text-center  bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-dvw">
            No Similar Products found
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProducts?.map((p) => (
            <div
              key={p._id}
              className="relative overflow-hidden bg-white rounded-lg shadow-md group hover:shadow-lg transition duration-300"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body p-4 text-black">
                <h5 className="card-title text-black">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> ₹ {p.price}</p>
                <button
                  className=" mt-2 mr-2 bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                {/* <button
                  className="btn bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full transition duration-300"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to Cart");
                  }}
                >
                  ADD TO CART
                </button> */}
              </div>
              {/* <div className="hover-overlay absolute inset-0 bg-gray-900 opacity-0 transition-opacity duration-300 flex justify-center items-center">
                <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Add to Cart
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
