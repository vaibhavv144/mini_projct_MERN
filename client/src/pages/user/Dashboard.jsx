import React from 'react'
import Layout from '../../component/La/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../component/La/UserMenu'
const Dashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title={"Dashboard-Foodie"}>
   <div className="container mx-auto m-3 p-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-1">
        <UserMenu />
      </div>
      <div className="col-span-2 md:col-span-2">
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold mb-4">Admin Details</h3>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Admin Name: {auth?.user?.name}</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Admin Email: {auth?.user?.email}</h3>
          </div>
          <div>
            <h3 className="text-lg font-medium">Admin Contact: {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

    </Layout>
  )
}

export default Dashboard
