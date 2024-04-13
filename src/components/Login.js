import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState(null);
  // const [passwordError, setPasswordError] = useState(null);
  const [data, setdata] = useState({})
  const navigate = useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!(data.email).match(/^\S+@\S+\.\S+$/)){
      toast.warn("Enter Valid Email ")
      return;
    }
    if((data.password).length < 8){
      toast.warn("Password Must have 8 letter")
      return;
    }
    const login = await axios.post("https://dryclean.onrender.com/api/v1/user/login",{
      email:data.email,password:data.password
    })
    console.log(login.data.user,data)
    if(login.data.success ){
      // Cookies.set("userId",login.data.user._id)
      Cookies.set("id",login.data.user._id,{  path: window.location.href,
      })
      navigate("/")
    }else{
      toast.error(login.data.message)
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
              Style={  "  letter-spacing: 1px; margin-top: 4vh; color: black; font-size: large; margin-left: 1vw;"
             }
            >
              Sign into your account
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
                  type="email"
                  className="form-control"
                  value={data.email}
                  onChange={(e)=>{setdata({...data,email:e.target.value})}}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Here"
                  Style={"    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"}
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
                  onChange={(e)=>{setdata({...data,password:e.target.value})}}
                  placeholder="Enter Your Password Here"
                  Style={"    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"}
                />
              </div>

              <button type="submit" className="btn " onClick={(e)=>handleSubmit(e)} Style={"background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);; border-color: #2e6da400;margin-top: 2vh; width: 9vw; color: white;font-size: 1.25vw;"}>
                Submit
              </button>
              
            </form>
            <p className="mb-5 pb-lg-2" style={{color: '#393f81',margin:'2vh'}}>Don't have an account?<Link to="/register"> <a href="" style={{color: '#393f81'}}>Register here</a></Link></p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
