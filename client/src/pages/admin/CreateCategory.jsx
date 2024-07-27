import React from "react";
import { useEffect, useState } from "react";
import AdminMenu from "../../component/La/AdminMenu";
import Layout from "../../component/La/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../component/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //hndle frm
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://mini-projct-mern.onrender.com/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`, { duration: 5000 });
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting input form");
    }
  };
  //gt all ctgries
  const getAllCategory= async () => {
    try {
      const { data } = await axios.get(
        `https://mini-projct-mern.onrender.com/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
// updte ctgry

const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://mini-projct-mern.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

//dlte ctgry
const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://mini-projct-mern.onrender.com/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
 


  return (
    <Layout title={"Dashboard - create category"}>
  <div className="container mx-auto mt-3 px-3 py-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-1">
        <AdminMenu />
      </div>
      <div className="col-span-2 md:col-span-2">
        <h1 className=" text-center font-bold text-lg mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-30">Manage Category</h1>
        <div className="p-3 w-1/2">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="w-3/4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-center font-bold text-sm mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-30 mr-4 ">Name</th>
                <th className="text-center  font-bold text-sm mt-6 ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-30  ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-2 text-center font-bold text-lg mt-6 bg-gray-500 hover:bg-gray-600 text-white  rounded-sm dark:hover:bg-gray-800 transition duration-300">{c.name}</td>
                  <td className="px-4 py-2 ">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </div>
  </div>
</Layout>

   
  );
};

export default CreateCategory;
