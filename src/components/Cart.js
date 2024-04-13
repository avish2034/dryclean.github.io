import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CartComp from "./CartComp";

const Cart = () => {
  // const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [total, settotal] = useState(0);
  const [user, setuser] = useState({})
  const getDetail = async (req,res)=>{
    if(Cookies.get("id")){
      const user = await axios.get(`http://localhost:401/api/v1/user/detail/${Cookies.get("id")}`)
      console.log(Cookies.get("id"));
      if(user.data.success){
        setuser(user.data.user)
      }
      console.log(user.data.user)
    }
  }
  const getAllCarts = async () => {
    if (!Cookies.get("id")) {
      toast.warn("User unauthenticated");
      return;
    }
    const id = Cookies.get("id");
    const cartItem = await axios.get(
      `http://localhost:401/api/v1/cart/get/${id}`
    );
    if (cartItem.data.success) {
      setdata(cartItem.data.cartItems);
    } else {
      toast.success("Please Add The Item in Cart.");
    }
  };
  const checkSubTotal = async () => {
    if (!Cookies.get("id")) {
      toast.warn("User unauthenticated");
      return;
    }
    const id = Cookies.get("id");
    const cartItem = await axios.get(
      `http://localhost:401/api/v1/cart/sumOfprice/${id}`
    );
    console.log(cartItem);
    if (cartItem.data.success) {
      settotal(cartItem.data.totalPrice);
    } else {
      console.log(cartItem.data.message);
    }
  };
  const checkOut = async (amount) => {
    if(!user.address){
      toast.warn("Please Add The Address")
      return;
    }
    if(!Cookies.get('id')){
      toast.warn('User unauthorized');
      return;
    }
    const order = await axios.post("http://localhost:401/api/v1/order/add",{
      userId:Cookies.get('id')
    })
    // var orderid='';
    if(order.data.success){
      console.log(order.data)
    }else{
      toast.error(order.data.message)
      return;
    }
    const checkout = await axios.post(`http://localhost:401/api/v1/checkout`, {
      amount,
    });
    console.log(checkout.data);
    const getId = await axios.get("http://localhost:401/api/v1/getkey");
    console.log(getId);
    var options = {
      key: getId.key, // Enter the Key ID generated from the Dashboard
      amount: checkout.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "DryClean",
      description: "Payment Of order",
      image:"./logo.png",
      order_id: checkout.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:401/api/v1/paymentverification/${order.data.orderid}`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#528ff0",
      },
      options:{
        checkout:{
          method:{
            netbanking:1,
            card:1,
            upi:1,
            wallet:1
          }
        }
      }
    };
    const rzp1 = new window.Razorpay(options)

    // to open razorpay checkout modal.
    rzp1.open();
  };
  useEffect(() => {
    getAllCarts();
    checkSubTotal();
    getDetail();
  }, []);
  return (
    <div>
      <Navigation />
      <div>
        <section class="pt-5 pb-5">
          <div class="container">
            <div class="row w-100">
              <div class="col-lg-12 col-md-12 col-12">
                <h3 class="display-5 mb-2 text-center">Shopping Cart</h3>
                <p class="mb-5 text-center">
                  <i class="text-info font-weight-bold">3</i> items in your cart
                </p>
                <table
                  id="shoppingCart"
                  class="table table-condensed table-responsive"
                >
                  <thead>
                    <tr>
                      <th Style={"width:60%"}>Product</th>
                      <th Style={"width:12%"}>Price</th>
                      <th Style={"width:10%"}>Quantity</th>
                      <th Style={"width:16%;text-align:center"}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((data, index) => {
                        return <CartComp data={data} item={data.item} cloth={data.item.clothType} category={data.item.clothType.categoryType} />;
                      })}
                  </tbody>
                </table>
                <div class="float-right text-right">
                  <h4>Subtotal:</h4>
                  <h1>Rs.{total}</h1>
                </div>
              </div>
            </div>
            <div class="row mt-4 d-flex cursor-pointer align-items-center">
              <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                <a href="/services">
                  <i class="fa fa-arrow-left mr-2"></i> Continue Shopping
                </a>
              </div>
              <div class="col-sm-6 order-md-2 text-right">
                <button
                  class="btn btn-primary mb-4 btn-lg pl-5 pr-5"
                  onClick={() => checkOut(total)}
                >
                  Checkout
                </button>
                <div class="float-right text-right">
                <h6>Added With Delivery Charege*</h6>
                <h6>If address is added</h6>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
