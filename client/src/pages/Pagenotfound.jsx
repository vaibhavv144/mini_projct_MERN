import React from "react";
import Layout from "../component/La/Layout";
import { Link} from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back-Page Not Found"}>
      <div className="pnf flex flex-col items-center justify-center">
  <h1 className="pnf-title text-6xl font-bold">404</h1>
  <h2 className="pnf-heading text-2xl font-semibold">Oops! Page Not Found</h2>
  <Link to="/" className="pnf-btn mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
    Go Back
  </Link>
</div>

    </Layout>
  );
};

export default Pagenotfound;
