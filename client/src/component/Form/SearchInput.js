import React from 'react'
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import {
//   Ripple,
//   Input,
//   initTWE,
// } from "tw-elements";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://mini-projct-mern.onrender.com/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex rounded bg-gray-100 dark:bg-gray-800 shadow-sm w-full">
    <form className="flex items-center w-full" role="search" onSubmit={handleSubmit}>
      <input
        className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 dark:text-gray-200"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button
        className="px-4 py-2 rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:outline-none"
        type="submit"
      >
        Search
      </button>
    </form>
  </div>
  
  );
};

export default SearchInput;