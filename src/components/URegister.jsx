import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import leftImage from "../leftSide.jpg";
import { toast } from "react-toastify";

// import 'react-toastify/dist/ReactToastify.css';
const URegister = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    e_year: "",
    address: "",
  });
  const navigate = useNavigate();
  const uploadData = async () => {
    const { name, email, phone, password, e_year, address } = data;
    const regis = await axios
      .post("http://localhost:2000/register", {
        name,
        email,
        phone,
        password,
        e_year,
        address,
      })
      .then(console.log("register"))
      .catch((error) => console.log(regis.error));
    console.log(regis);
    if (regis.data.error) {
      toast.error(regis.data.error);
    } else {
      navigate("/user");
    }
  };
  const submitData = async (e) => {
    setLoader(true);
    e.preventDefault();
    const { password, repassword } = data;
    if (password === repassword) {
      await uploadData();
      setData({
        name: "",
        email: "",
        phone: "",
        password: "",
        e_year: "",
        address: "",
      });
    } else {
      console.log("password doesn't match");
    }
    setLoader(false);
  };
  return (
    <div>
      {loader ? (
        <div className=" text-center w-[6%] mx-auto my-[41vh]">
          <Triangle
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <div className="flex h-[50.70rem] font-mono w-full justify-between">
          <img src={leftImage} className="w-[50%] " alt="" />
          <form
            action="post"
            className=" w-[50%] bg-[#71d7ff] text-center mx-auto py-[6rem]"
          >
           
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              className=" mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto h-[3.5rem] text-lg  pl-4"
              id="name"
              placeholder="Enter The Institute || library Name"
            />
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
              className="  mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto h-[3.5rem] text-lg  pl-4"
              id="phone"
              placeholder="Enter The Phone Number"
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              className="  mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto h-[3.5rem] text-lg  pl-4"
              id="email"
              placeholder="Enter The Email"
            />

            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              className="  mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto h-[3.5rem] text-lg  pl-4"
              id="password"
              placeholder="Enter The password"
            />

            <input
              type="password"
              name="repassword"
              value={data.repassword}
              onChange={(e) => {
                setData({ ...data, repassword: e.target.value });
              }}
              className="  mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto h-[3.5rem] text-lg  pl-4"
              id="re-password"
              placeholder="Enter The Re-password"
            />
            <input
              type="number"
              name="e_year"
              value={data.e_year}
              onChange={(e) => {
                setData({ ...data, e_year: e.target.value });
              }}
              className="  mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto h-[3.5rem] text-lg  pl-4"
              id="e_year"
              placeholder="Enter The Established Year"
            />
            <textarea
              name="address"
              className="  mt-5 rounded-[0.4rem] outline-none block w-[70%] mx-auto resize-none h-[5rem] text-lg py-1  pl-4"
              placeholder="Enter The Address"
              id="address"
              cols="30"
              rows="30"
              value={data.address}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
            ></textarea>
            <h6 className=" text-blue-800 underline mr-2 my-2 text-right">
              <Link to="/user">Already Register</Link>
            </h6>
            <button
              type="button"
              className="w-[20%] bg-green-600 text-white mt-6 b-4 py-2 rounded-lg shadow-xl"
              onClick={(e) => submitData(e)}
            >
              Register
            </button>
            
          </form>
        </div>
      )}
    </div>
  );
};

export default URegister;
