import axios from "axios";
import Cookies from "js-cookie";
import React,{useState} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [data, setdata] = useState({})

  const navigate = useNavigate();
  const reset= async(req,res,e)=>{
      if(Cookies.get("id")){
        const update = await axios.put(
          `http://localhost:401/api/v1/user/reset-password/${Cookies.get("id")}`,
            {oldPassword:data.password,newPassword:data.repassword});
        if(update.data.success){
          toast.success("Password Reset Successfully")
          Cookies.remove("id");
          navigate('/login');
        }else{
          toast.error(update.data.message)

        }
        
      }
  }
  return (
    <div className="container" Style={"    padding-top: 5vh;"}>
      <div
        className="bg-primary"
        Style={"    min-height: 39vh;max-height: 25vh;"}
      ></div>
      <div
        className="bg-black"
        Style={
          "width: 34%;text-align:center; height: 57vh; margin: -149px auto;  background:white;  box-shadow: 1px 4px 17px 1px rgba(0,0,0,0.5);border-radius: 5px;"
        }
      >
      <i className=" fa fa-duotone fa-lock" Style={"    color: red;font-size: 8rem;padding-top: 3vh;"}></i>
        <h1 className="mt-5" Style={"padding:1vh ;padding-bottom:3vh"}>
          Reset Password
        </h1>
        <div
          className="mb-3 "
          Style={"margin: 1.5vh auto; width: 70%;height: 4.5vh;"}
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
        <div
          className="mb-3 "
          Style={"margin: 2vw auto; width: 70%;height: 5vh;"}
        >
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={data.repassword}
            onChange={(e) => {
              setdata({ ...data, repassword: e.target.value });
            }}
            placeholder="Enter Your New Password Here"
            Style={
              "    padding: 2.25vh 1vw;border: 1px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
            }
          />
        </div>

        <button
          type="submit"
          className="btn "
            onClick={(e) => reset(e)}
          Style={
            "background: linear-gradient(to right, #1f592c 0%, #42af45  100%);; border-color: #2e6da400;margin-top: 2vh; width: 9vw; color: white;font-size: 1.25vw;"
          }

        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
