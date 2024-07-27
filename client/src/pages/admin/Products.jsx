import React, { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Layout from '../../component/La/Layout'
import AdminMenu from '../../component/La/AdminMenu'

const Products = () => {
 const [products, setProducts] = useState();
  
 const getAllproducts = async()=>{
  try {
    const {data} = await axios.get(`https://mini-projct-mern.onrender.com/api/v1/product/get-product`)
    setProducts(data.products)
    
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong");
 
    
  }
 }
 useEffect(()=>{
  getAllproducts()
 })



  return (
    
    <Layout>
    <div className="flex">
      <div className="w-1/4">
        <AdminMenu />
      </div>
      <div className="w-3/4">
        <h1 className="text-center text-lg font-bold mb-6  mt-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300">All Products List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
            >
              <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <img
                  src={`https://mini-projct-mern.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{p.name}</div>
                  <p className="text-gray-700 text-base">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  
 
  
  )
}

export default Products
