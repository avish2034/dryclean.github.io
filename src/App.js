import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js"
import "./App.css";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Otp from "./components/Otp.js";
import Profile from "./components/Profile.js";
import ResetPassword from "./components/ResetPassword.js";
import ServiceComp from "./components/ServiceComp.js";
import Cloths from "./components/Cloths.js";
import Items from "./components/Items.js";
import Cart from "./components/Cart.js";
import Order from "./components/Order.js";
import PaymentSuccess from "./components/PaymentSuccess.js";
import PaymentFail from "./components/PaymentFail.js";
import ShowOrder from "./components/showOrder.js";
// import Adminlogin from "./components/Adminlogin.js";
// import AdminHome from "./components/AdminHome.js";
// import Category from "./components/Category.js";

const App = () => {
  

  return (
    <Router>
    <ToastContainer
    position='top-right'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='light'
    />
      <div>
     
    
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/services" element={<ServiceComp/>} />
        <Route path="/cloths" element={<Cloths/>} />
        <Route path="/items" element={<Items/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>
        <Route path="/paymentfailed" element={<PaymentFail/>}/>
        <Route path="/order/show" element={<ShowOrder/>}/>
        {/* <Route path="/admin" element={<Adminlogin/>} />
        // <Route path="/admin/home" element={<AdminHome/>} />
  // <Route path="/admin/category" element={<Category/>} />*/}
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
