import React, { useState, useEffect } from "react";
import Layout from "../../component/La/Layout";
import AdminMenu from "../../component/La/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  // gt all ctgry
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  // create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully", { duration: 5000 });
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  

  return (
    <Layout title={"Dashboard-Create Product"}>
  <div className="container mx-auto mt-3 p-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-3">
        <AdminMenu />
      </div>
      <div className="col-span-1 md:col-span-2">
        <h1 className="text-center font-bold text-lg mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full">Create Product</h1>
        <Select
          bordered={false}
          placeholder="Select a category"
          size="large"
          showSearch
          className="w-full mb-4"
          onChange={(value) => {
            setCategory(value);
          }}
        >
          {categories?.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
        <div className="mb-4">
          <label className="btn btn-outline-secondary w-full">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
        {photo && (
          <div className="mb-4">
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"5000px"}
                className="img img-responsive"
              />
            </div>
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={name}
            placeholder="write a name"
            className="w-full px-4 py-2 rounded border-red-700 focus:outline-none focus:border-indigo-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            type="text"
            value={description}
            placeholder="write a description"
            className="w-full h-32 px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={price}
            placeholder="write a Price"
            className="w-full px-4 py-2 rounded border-gray-300 focus:outline-black focus:border-indigo-500"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={quantity}
            placeholder="write a quantity"
            className="w-full px-4 py-2 rounded border-gray-300 focus:outline-black focus:border-indigo-500"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <Select
          bordered={false}
          placeholder="Select Shipping "
          size="large"
          showSearch
          className="w-full mb-4"
          onChange={(value) => {
            setShipping(value);
          }}
        >
          <Option value="0">No</Option>
          <Option value="1">Yes</Option>
        </Select>
        <div className="mb-4">
          <button
            className="text-center font-bold text-lg mt-8 bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-full"
            onClick={handleCreate}
          >
            CREATE PRODUCT
          </button>
        </div>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default CreateProduct;
