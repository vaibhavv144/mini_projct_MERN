import React from 'react'
import Layout from '../../component/La/Layout'
import AdminMenu from '../../component/La/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout>
    <div className="container mx-auto m-3 p-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-1">
        <AdminMenu />
      </div>
      <div className="col-span-2 md:col-span-2">
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-center  mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4   dark:hover:bg-gray-800 transition duration-300">Admin Details</h3>
          <div className="mb-4">
            <h3 className=" font-bold text-lg mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300">Admin Name: {auth?.user?.name}</h3>
          </div>
          <div className="mb-4">
            <h3 className=" font-bold text-lg mt-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300">Admin Email: {auth?.user?.email}</h3>
          </div>
          <div>
            <h3 className=" font-bold text-lg mt-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full  dark:hover:bg-gray-800 transition duration-300">Admin Contact: {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Layout>
  
  )
}

export default AdminDashboard
