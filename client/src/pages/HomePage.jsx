import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../component/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Footer from "../LadingPage/Footer/Footer";
import Header from "../component/La/Header";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://mini-projct-mern.onrender.com/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mini-projct-mern.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `https://mini-projct-mern.onrender.com/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mini-projct-mern.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter products by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `https://mini-projct-mern.onrender.com/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Header />
      
      
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Section */}
          <div className="col-span-1">
            <h4 className="text-center font-bold text-lg bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full">
              Filter By Category
            </h4>
            <div className="flex flex-col mt-4  text-white dark:text-white">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="dark:text-white"
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Price Filter */}
            <h4 className="text-center font-bold text-lg mt-8 bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded-full  dark:text-white">
              Filter By Price
            </h4>
            <div className="flex flex-col mt-4 text-white dark:text-white">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array} className="dark:text-white">
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="flex flex-col mt-8">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          {/* Product Display Section */}
          <div className="col-span-3">
            <h1 className="text-center font-bold text-2xl mb-8 bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full">
              All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.map((p) => (
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
                  key={p._id}
                >
                  <img
                    src={`https://mini-projct-mern.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-40 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4">
                    <h5 className="font-bold text-lg text-black">{p.name}</h5>
                    <p className="text-gray-500 mt-2">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="text-gray-700 font-bold mt-2">₹ {p.price}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
                        onClick={() => {
                          console.log("Product Slug:", p.slug);
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Load More Button */}
            <div className="mt-8 flex justify-center">
              {products && products.length < total && (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
