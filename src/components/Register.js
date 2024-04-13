import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState(null);
  // const [passwordError, setPasswordError] = useState(null);
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!data.email||!data.password||!data.mobile||!data.name){
      toast.warn("All Field Must Required")
      return;
    }
    if((data.mobile).length !== 10){
      toast.warn("mobile Number Must have 10 Number")
      return;
    }
    if((data.password).length < 8){
      toast.warn("Password Must have 8 letter")
      return;
    }
    if(!(data.email).match(/^\S+@\S+\.\S+$/)){
      toast.warn("Enter Valid Email ")
      return;
    }
    const register = await axios.post(
      "http://localhost:401/api/v1/user/register",
      {
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        name: data.name,
      }
    );
    console.log(register.data);

    if (register.data.success) {
      if (register.data.user) {
        console.log(register.data.user)
        Cookies.set("id", register.data.user._id,{  path: window.location.href,
        });
        localStorage.setItem("otp", register.data.OTP);
        navigate("/otp");
      }else{
      Cookies.set("id", register.data.checkEmail._id,{  path: window.location.href,
      });
      localStorage.setItem("otp", register.data.OTP);
      navigate("/otp");
    }
    } else {
      toast.error(register.data.message);
    }
  };

  // const validateForm = () => {
  //   // Perform validation and set error states accordingly
  // };
  return (
    <div>
      <div className="container text-center border-none h-100">
        <div className="row h-100">
          <div className="col-sm-6 no-border ">
            {" "}
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-thumbnail min-vh-93 "
              alt="Login"
              Style={"min-height:93vh;border:none"}
            ></img>
          </div>
          <div className="col-sm-6 mt-5 ">
            <div className="d-flex flex-row mt-5" Style={"margin-top: 21vh;"}>
              <span className="h1 fw-bold mb-0">DRY CLEAN</span>
            </div>
            <h5
              className="fw-normal my-4 pt-5 pb-3"
              Style={
                "  letter-spacing: 1px; margin-top: 4vh; color: black; font-size: large; margin-left: 1vw;"
              }
            >
              SignUp into your account
            </h5>

            <form
              Style={
                "  margin-top: 7vh; width: 80%;text-align: center; margin: 7vh auto;"
              }
            >
              <div
                className="mb-3 "
                Style={"margin: 2vw auto; width: 70%;height: 4vh;"}
              >
                <input
                  type="text"
                  className="form-control"
                  value={data.name}
                  onChange={(e) => {
                    setdata({ ...data, name: e.target.value });
                  }}
                  id="exampleInputEmail1"
                  placeholder="Enter Name Here"
                  Style={
                    "    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                  }
                />
              </div>
              <div
                className="mb-3 "
                Style={"margin: 2vw auto; width: 70%;height: 4vh;"}
              >
                <input
                  type="email"
                  className="form-control"
                  value={data.email}
                  required
                  
                  onChange={(e) => {
                    setdata({ ...data, email: e.target.value });
                  }}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Here"
                  Style={
                    "    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                  }
                />
              </div>
              <div
                className="mb-3 "
                Style={"margin: 2vw auto; width: 70%;height: 4vh;"}
              >
                <input
                  type="number"
                  className="form-control"
                  value={data.mobile}
                  maxLength={10}
                  minLength={10}
                  onChange={(e) => {
                    setdata({ ...data, mobile: e.target.value });
                  }}
                  id="exampleInputEmail1"
                  placeholder="Enter Mobile Here"
                  Style={
                    "    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                  }
                />
              </div>
              <div
                className="mb-3 "
                Style={"margin: 2vw auto; width: 70%;height: 4vh;"}
              >
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={data.password}
                  onChange={(e) => {
                    setdata({ ...data, password: e.target.value });
                  }}
                  placeholder="Enter Your Password Here"
                  Style={
                    "    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                  }
                />
              </div>

              <button
                type="submit"
                className="btn "
                onClick={(e) => handleSubmit(e)}
                Style={
                  "background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);; border-color: #2e6da400;margin-top: 2vh; width: 9vw; color: white;font-size: 1.25vw;"
                }
              >
                Submit
              </button>
            </form>
            <p
              className="mb-5 pb-lg-2"
              style={{ color: "#393f81", margin: "2vh" }}
            >
              You have an account?{" "}
              <Link to="/login">
                <a href="#!" style={{ color: "#393f81" }}>
                  Login here
                </a>{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
