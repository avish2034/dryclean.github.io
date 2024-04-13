import axios from "axios";
import Cookies from "js-cookie";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Otp = () => {
    const [otp, setotp] = useState({})
    const navigate = useNavigate()
    const sendOtp = async(e)=>{
        if(otp.otp == localStorage.getItem("otp")){
        e.preventDefault();
        const sendotp = axios.post("http://localhost:401/api/v1/user/verification",{
            otp:otp.otp,
            id:Cookies.get("id")
        })
        console.log(sendotp.data)
        // if(sendotp.data.success){
            navigate("/login")
            Cookies.remove('id')
        // }else{
        //     toast.error( sendotp.data.message)
        // }
    }else{
        toast.error( "OTP is wrong")
    }
    }
  return (
    <div>
      <div className="container">
        <form
          class="row g-3"
          Style={
            "    height: 98vh; width: 16%;margin: 0vh auto; padding-top: 40vh;"
          }
        >
          <div class="col-auto">
            <input
              type="number"
              maxLength={4}
                value={otp.otp}
              class="form-control"
              id="inputPassword2"
              placeholder="OTP"
              onChange={(e)=>setotp({...otp,otp:e.target.value})}
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn btn-primary mb-3"
              Style={"  margin: 0px 4.25vw;  margin-top: 1vh;"}
              onClick={(e)=>sendOtp(e)}
            >
              Confirm{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
