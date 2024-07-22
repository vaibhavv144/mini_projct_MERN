import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white">
        <div className="text-center ">
          <ul className="list-none">
            <h4 className="text-center font-bold text-lg mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300">
              Admin Panel
            </h4>
            <li className="mb-2">
              <NavLink
                to="/dashboard/admin/create-category"
                className="block text-center font-bold text-lg mt-4 bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-300"
                activeClassName="bg-gray-200 dark:bg-gray-800"
              >
                Create Category
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/dashboard/admin/create-product"
                className="block text-center font-bold text-lg mt-2 bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-300"
                activeClassName="bg-gray-200 dark:bg-gray-800"
              >
                Create Product
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/dashboard/admin/products"
                className="block text-center font-bold text-lg mt-2 bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-30"
                activeClassName="bg-gray-200 dark:bg-gray-800"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/orders"
                className="block text-center font-bold text-lg mt-2 bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded-md dark:hover:bg-gray-800 transition duration-30"
                activeClassName="bg-gray-200 dark:bg-gray-800"
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
