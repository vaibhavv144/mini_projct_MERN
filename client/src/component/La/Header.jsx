import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategories";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
import Logo from "../../assets/food-logo.png";
// import { AiOutlineMenu } from "react-icons/ai";

import { FaHome } from "react-icons/fa";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const categories = useCategory();

  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );

  // Effect for setting theme
  // useEffect(() => {
  //   const element = document.documentElement;
  //   if (theme === "dark") {
  //     element.classList.add("dark");
  //   } else {
  //     element.classList.remove("dark");
  //   }
  //   localStorage.setItem("theme", theme);
  // }, [theme]);


  //old logut 
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    localStorage.removeItem("cart"); // Ensure the cart key matches your localStorage key
    sessionStorage.removeItem("cartItems"); // If using session storage

  // Clear cart context state
  
  setCart([]);

  // Display success message
    toast.success("Logout Successfully", { duration: 5000 });
  };

    return (
    <>
     <nav className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 navbar navbar-expand-lg bg-body-tertiary w-full">
  <div className="container py-3 sm:py-0">
    <div className="flex justify-between items-center">
      <div>
        <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
          <img src={Logo} alt="Logo" className="w-10" />
          <span className="text-red-500">FOOD</span>
          <span className="text-yellow-400">-</span>
          <span className="font-bold">DIE</span>
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <SearchInput />
        <ul className="flex items-center justify-end space-x-4 h-full">
          <li>
            <NavLink to="/homepage" className="text-black text-bold dark:text-white">
              <FaHome size={45} />
            </NavLink>
          </li>
          <li className="nav-item relative">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full">
              <NavLink
                to="/categories"
                className="nav-link text-black hover:text-white dark:text-white dark:hover:text-white"
                id="categoriesDropdown"
                data-dropdown-toggle="dropdown"
              >
                Categories
              </NavLink>
            </button>
            <ul
              className="absolute hidden top-full right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 z-10"
              id="categoriesDropdownMenu"
              aria-labelledby="categoriesDropdown"
            >
              <li>
                <NavLink
                  to="/categories"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-black dark:hover:bg-gray-700"
                >
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <li key={c.slug}>
                  <NavLink
                    to={`/category/${c.slug}`}
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          {!auth?.user ? (
            <>
              <li>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full dark:hover:text-white">
                  <NavLink to="/register" className="text-gray-600 dark:text-white">
                    Register
                  </NavLink>
                </button>
              </li>
              <li>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full dark:hover:text-white">
                  <NavLink to="/login" className="text-gray-600 dark:text-white">
                    Login
                  </NavLink>
                </button>
              </li>
            </>
          ) : (
            <li className="relative">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full dark:hover:text-white"
                id="userDropdown"
                onClick={() => {
                  const dropdownMenu = document.getElementById("userDropdownMenu");
                  dropdownMenu.classList.toggle("hidden");
                }}
              >
                {auth?.user?.name}
              </button>
              <ul
                className="absolute top-full right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 z-10 hidden"
                id="userDropdownMenu"
                aria-labelledby="userDropdown"
              >
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
          <li>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full dark:hover:text-white">
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="text-gray-600 dark:text-white flex items-center">
                  <FaShoppingCart className="mr-1" />
                  Cart
                </NavLink>
              </Badge>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</>
  );
};

export default Header;
