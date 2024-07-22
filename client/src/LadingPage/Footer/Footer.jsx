import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "../../assets/food-logo.png";
import {  Link } from "react-router-dom";
import Contact from "../../pages/Contact"

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <section className="max-w-[1200px] mx-auto">
        <div className=" grid md:grid-cols-3 py-5">
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
              FOODIE
            </h1>
            <p className="text-white">
            © 2024 Bundl Technologies Pvt. Ltd
            </p>
            <br />
            <div className="flex items-center gap-3 text-white">
              <FaLocationArrow />
              <p>Noida, Uttar Pradesh</p>
            </div>
            <div className="flex items-center gap-3 mt-3 text-white">
              <FaMobileAlt />
              <p>+91 123456789</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6 text-white">
              <a href="#">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 text-white">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Company 
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  <li className="cursor-pointer">About</li>
                  <li className="cursor-pointer">Careers</li>
                  <li className="cursor-pointer">Team</li>
                  


                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Contact us
                </h1>
                <ul className="flex flex-col gap-3">
                  
                  <li className="cursor-pointer"><Link to ='/contact'>Help & Support </Link></li>
                 <li className="cursor-pointer">Partner with us</li>
                  <li className="cursor-pointer">Ride with us</li>
                  
                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                We deliver to:
                </h1>
                {/* <ul className="list-disc list-inside"> */}
                <ul className="flex flex-col gap-3">
                  <li className="cursor-pointer">Bangalore</li>
                  <li className="cursor-pointer">Gurgaon</li>
                  <li className="cursor-pointer">Delhi</li>
                  <li className="cursor-pointer">Mumbai</li>
                  <li className="cursor-pointer">and more.....</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-10 border-t-2 border-gray-300/50 text-white">
            @copyright 2024 All rights reserved || VAIBHAV SINGH
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
