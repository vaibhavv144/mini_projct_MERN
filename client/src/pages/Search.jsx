import React from "react";

import { useSearch } from "../context/search";
import Layout from "../component/La/Layout";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";




const Search = () => {
  const [values, setValues] = useSearch();

  const [cart, setCart] = useCart([]);
  return (
    <Layout title={"Search results"}>
    <div className="container mx-auto">
  <div className="text-center">
    <h1 className="text-2xl font-bold">Search Results</h1>
    <h6>
      {values?.results.length < 1
        ? "No Products Found"
        : `Found ${values?.results.length}`}
    </h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {values?.results.map((p) => (
        <div key={p._id} className="rounded-lg shadow-md overflow-hidden">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
            className="w-full h-64 object-cover"
            alt={p.name}
          />
          <div className="p-4">
            <h5 className="text-lg font-bold mb-2">{p.name}</h5>
            <p className="text-sm text-gray-700 mb-4">{p.description.substring(0, 30)}...</p>
            <p className="text-lg font-semibold">$ {p.price}</p>
            <div className="mt-4">
              <button className="btn-primary mt-2 px-4 py-2 rounded-md hover:bg-blue-700">
                More Details
              </button>
              {/* <button className="btn-secondary mt-2 px-4 py-2 rounded-md hover:bg-gray-700">
                ADD TO CART
              </button> */}
               <button
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        ADD TO CART
                      </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    </Layout>
  );
};

export default Search;