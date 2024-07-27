import React,{useState,useEffect} from "react";
import Layout from "../component/La/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //

 //get payment gateway token
 const getToken = async () => {
  try {
    const { data } = await axios.get(`https://mini-projct-mern.onrender.com/api/v1/product/braintree/token`);
    setClientToken(data?.clientToken);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getToken();
}, [auth?.token]);

//handle payments
const handlePayment = async () => {
  try {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post(`https://mini-projct-mern.onrender.com/api/v1/product/braintree/payment`, {
      nonce,
      cart,
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders");
    toast.success("Payment Completed Successfully ");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  return (
    <Layout>
    <div className="container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="col-span-1 md:col-span-2">
      <h1 className="text-center bg-red-400 hover:bg-red-600 p-2 mb-1">
        {`Hello ${auth?.token && auth?.user?.name}`}
      </h1>
      <h4 className="text-center bg-yellow-400 hover:bg-yellow-600  rounded-full">
        {cart?.length
          ? `You Have ${cart.length} items in your cart ${
              auth?.token ? "" : "please login to checkout"
            }`
          : "Your Cart Is Empty"}
      </h4>
    </div>
    <div className="col-span-1 md:col-span-1">
      {cart?.map((p, index) => (
        <div
          key={index}
          className="mb-2 p-3 card flex-row shadow-md hover:shadow-lg"
        >
          <div className="w-1/3">
            <img
              src={`https://mini-projct-mern.onrender.com/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
          </div>
          <div className="w-2/3">
            <p>{p.name}</p>
            <p>{p.description.substring(0, 30)}</p>
            <p>Price: {p.price}</p>
            <button
              className="btn bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full"
              onClick={() => removeCartItem(p._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="col-span-1 md:col-span-1 text-center">
      <h2 className="mb-2">Cart Summary</h2>
      <p>Total | Checkout | Payment</p>
      <hr />
      <h4 className="mb-2">Total : {totalPrice()} </h4>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <h4>Current Address</h4>
            <h5>{auth?.user?.address}</h5>
            <button
              className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Update Address
            </button>
          </div>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Update Address
            </button>
          ) : (
            <button
              className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Please Login to Checkout
            </button>
          )}
        </div>
      )}
      <div className="mt-2">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />

<button
  className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full"
  onClick={handlePayment}
  disabled={loading || !instance || !auth?.user?.address}
> 
  {loading ? "Processing ...." : "Make Payment"}
</button>


          </>
        )}
      </div>
    </div>
  </div>
</div>


    </Layout>
  );
};

export default CartPage;