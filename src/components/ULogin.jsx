import axios from "axios";
// import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import rightImage from "../../public/img/rightSide.png";
const ULogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const LoginData = async (e) => {
    console.log(data);
    e.preventDefault();
    const login = await axios.post("http://localhost:2000/user/login", data);
    if (login.data.error) {
      // toast.error(login.data.error);
      // console.log(login.error)
    } else {
      // console.log(login.data.error)
      console.log(login.data);
      // toast.success("Login Successfully");
      navigate("/user/home");
    }
    if(login.data.userid){
      console.log(login.data.userid)
      localStorage.setItem("user", login.data.userid);
    }
  };
  return (
    <div>
      <div className="flex font-mono w-full justify-between">
        <form
          action=""
          method=""
          className=" w-[50%] h-[50.70rem] bg-[#007dfe] pt-[13rem] text-center  "
        >
          <h1 className=" text-[1.5rem] my-[2rem] tracking-[0.30rem] text-white  font-semibold">
            WELCOME
          </h1>
          <input
            type="email"
            name="email"
            className=" border border-slate-400 mt-5  outline-none block w-[70%] mx-auto h-[7vh] rounded-[1.875rem] text-lg my-[2rem] pl-[2rem]"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter The Email"
          />

          <input
            type="password"
            name="password"
            className=" border border-slate-400  outline-none block w-[70%] mx-auto h-[7vh] rounded-[1.875rem] text-lg mt-[2rem] mb-[1rem]  pl-[2rem]"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter The Password"
          />
          <h6 className=" text-white text-right underline pr-24">
            <Link to="/user/register">Create Account</Link>{" "}
          </h6>
          <button
            onClick={(e) => LoginData(e)}
            className="w-[70%] text-white text-2xl bg-[#00cd93] rounded-[1.875rem] my-6 py-3 shadow-xl"
          >
            Login
          </button>
          
        </form>
        <img src="../../public/img/rightSide.png" className="w-[45%] " alt="" />
      </div>
    </div>
  //   <div className="container">
  //   <div className="row justify-content-between">
  //     <form
  //       className="col-6 bg-primary text-center p-5"
  //     >
  //       <h1 className="text-white font-weight-bold mb-4">WELCOME</h1>
  //       <input
  //         type="email"
  //         name="email"
  //         className="form-control mb-4"
  //         value={data.email}
  //         onChange={(e) => setData({ ...data, email: e.target.value })}
  //         placeholder="Enter The Email"
  //       />

  //       <input
  //         type="password"
  //         name="password"
  //         className="form-control mb-4"
  //         value={data.password}
  //         onChange={(e) => setData({ ...data, password: e.target.value })}
  //         placeholder="Enter The Password"
  //       />
  //       <h6 className="text-white text-right mb-4">
  //         <Link to="/user/register" className="text-white">
  //           Create Account
  //         </Link>
  //       </h6>
  //       <button
  //         type="submit"
  //         onClick = {(e)=>LoginData(e)}
  //         className="btn btn-success btn-lg btn-block mb-4"
  //       >
  //         Login
  //       </button>
  //     </form>
  //     <img
  //       src="../../public/img/rightSide.png"  
  //       className="col-6 img-fluid"
  //       alt="Right Image"
  //     />
  //   </div>
  // </div>
  );
};

export default ULogin;
