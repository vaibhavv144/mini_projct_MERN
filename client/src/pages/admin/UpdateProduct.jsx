import { Layout } from 'antd'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import AdminMenu from '../../component/La/AdminMenu'
import { Select } from "antd";
import { useNavigate,useParams } from 'react-router-dom'
import Footer from '../../LadingPage/Footer/Footer';
import Header from '../../component/La/Header';
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    //gt sngle prdct
    const getSingleProduct = async () => {
        try {
          const { data } = await axios.get(
            `https://mini-projct-mern.onrender.com/api/v1/product/get-product/${params.slug}`
          );
          setName(data.product.name);
          setId(data.product._id);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setShipping(data.product.shipping);
          setCategory(data.product.category._id);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
      }, []);

        //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`https://mini-projct-mern.onrender.com/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  // updte prdct fnctn
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `https://mini-projct-mern.onrender.com/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully", { duration: 5000 });
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  // dlte product 
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://mini-projct-mern.onrender.com/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully", { duration: 5000 });
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="dark:bg-gray-900 dark:text-white">
    <Header/>
    <div className="container mx-auto my-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1">
          <AdminMenu />
        </div>
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Update Product</h1>
          <div className="max-w-lg mx-auto">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary block">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`https://mini-projct-mern.onrender.com/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
  
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="text-center text-lg font-bold  bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button className="text-center text-lg font-bold   bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300 " onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <Footer/>
  </div>
  
  )
}

export default UpdateProduct
