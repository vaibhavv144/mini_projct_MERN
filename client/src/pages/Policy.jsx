import React from "react";
import Layout from "../component/La/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpeg"
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            At E-commerce, safeguarding your privacy is paramount. As you
            navigate our MERN MongoDB, Express.js, React.js, Node.js platform,
            be assured that all transactions are securely processed, utilizing
            encryption and industry-standard security protocols. We collect
            personal information like name, address, and contact details solely
            for order processing, shipping, and customer support purposes, never
            sharing or selling it to third parties for marketing. Our use of
            cookies enhances your browsing experience and allows us to analyze
            website traffic responsibly. You have the freedom to customize your
            communication preferences, opting in or out of promotional emails
            and newsletters at any time. We prioritize data security, employing
            robust measures to prevent unauthorized access, alteration, or
            disclosure. By utilizing our services, you implicitly agree to the
            terms outlined in this privacy policy. Your trust is our driving
            force, and we are dedicated to providing a safe and secure
            environment for your online shopping experience.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
