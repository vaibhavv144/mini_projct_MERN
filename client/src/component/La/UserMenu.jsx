import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
    <div className="text-center ">
      <ul className="list-none">
        <h4 className="text-lg font-semibold mb-4">Dashboard</h4>
        <li className="mb-2">
          <NavLink
            to="/dashboard/user/profile"
            className="block py-2 px-4 rounded-md text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            activeClassName="bg-gray-200 dark:bg-gray-800"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/orders"
            className="block py-2 px-4 rounded-md text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            activeClassName="bg-gray-200 dark:bg-gray-800"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
  
  )
}

export default UserMenu
