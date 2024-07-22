// import React, { useState, useEffect } from "react";
import Logo from "../../assets/food-logo.png";
// import { FaCartShopping } from "react-icons/fa6";
// import DarkMode from "./DarkMode";


import {  Link } from "react-router-dom";

// const Menu = [
//   {
//     id: 1,
//     name: "Home",
//     link: "/homepage",
//   },
//   {
//     id: 2,
//     name: "Register",
//     link: "/register",
//   },
//   {
//     id: 3,
//     name: "Login",
//     link: "/login",
//   },
// ];
// const Menu = [
//   {
//     id: 1,
//     name: "Home",
//     component: HomePage,
//   },
//   {
//     id: 2,
//     name: "Register",
//     component: Register,
//   },
//   {
//     id: 3,
//     name: "Login",
//     component: Login,
//   },
// ];
// const Navbar = () => {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
//   );

//   useEffect(() => {
//     const element = document.documentElement;
//     if (theme === "dark") {
//       element.classList.add("dark");
//     } else {
//       element.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
//       <div className="container py-3 sm:py-0">
//         <div className="flex justify-between items-center">
//           <div>
//             <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
//               <img src={Logo} alt="Logo" className="w-10" />
//               <span className="text-red-600">FOO</span>
//               {/* <span className="text-yellow-400">-</span> */}
//               <span className="font-extrabold">DIE</span>
//             </a>
//           </div>
//           <div className="flex justify-between items-center gap-4">
//             <div>
//               <DarkMode theme={theme} setTheme={setTheme} />
//             </div>
//             <ul className="hidden sm:flex items-center gap-4 ">
//               {Menu.map((menu) => (
//                 <li key={menu.id}>
//                   <a
//                     href={menu.link}
//                     className="inline-block py-4 px-4 hover:text-yellow-500"
//                   >
//                     {menu.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//             <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
//               Order
//               <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



const Menu = [
  {
    id: 1,
    name: 'Home',
    component: 'homepage',
  },
  {
    id: 2,
    name: 'Register',
    component: 'register',
  },
  {
    id: 3,
    name: 'Login',
    component: 'login',
  },
  
];

const Navbar = () => {
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem('theme') : 'light'
  // );

  // useEffect(() => {
  //   const element = document.documentElement;
  //   if (theme === 'dark') {
  //     element.classList.add('dark');
  //   } else {
  //     element.classList.remove('dark');
  //   }
  //   localStorage.setItem('theme', theme);
  // }, [theme]);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              <span className="text-red-600">FOO</span>
              <span className="font-extrabold">DIE</span>
            </Link>
          </div>
          <div className="flex justify-between items-center gap-4">
            {/* <div>
              <DarkMode theme={theme} setTheme={setTheme} />
            </div> */}
            <ul className="hidden sm:flex items-center gap-3 m-3">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={`/${menu.component}`}
                    className="inline-block py-4 px-4 hover:text-yellow-500"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1  rounded-full flex items-center gap-3  ">
              Order
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;