import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "./navigation";
const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getDetail = async (req, res) => {
    if (Cookies.get("id")) {
      const user = await axios.get(
        `https://dryclean.onrender.com/api/v1/user/detail/${Cookies.get("id")}`
      );
      console.log(Cookies.get("userId"));
      if (user.data.success) {
        setUser(user.data.user);
      }
      console.log(user.data.user);
    }
  };
  const ResetPassword = async(req,res)=>{
    navigate("/reset-password")
  }
  const logout = async(req,res)=>{
    if(Cookies.get("id")){
        const logoutUser= await axios.get("https://dryclean.onrender.com/api/v1/user/logout")
        if(logoutUser.data.success){
            toast.success("User Logout Successfull")
            Cookies.remove('id')
            navigate("/")
        }else{
            toast.error("user cannot logout")
        }
    }
  }
  const updateUser=async(e)=>{
    if (Cookies.get("id")) {
        const update = await axios.put(
          `https://dryclean.onrender.com/api/v1/user/update/${Cookies.get("id")}`,
            {name:user.name,mobile:user.mobile,address:user.address,landmark:user.landmark,pincode:user.pincode,city:user.city,state:user.state}
          
        );
        console.log(Cookies.get("userId"));
        if (update.data.success) {
          setUser(update.data.user);
          toast.success(update.data.message)

        }else{
            toast.error(update.data.message)
        }
        console.log(update.data.user);
      }
  }
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <div >
    <Navigation/>
      <div className="container" Style={"    padding-top: 10vh;height: 100%;"}>
      <div Style={"display:flex;align-items:center;justify-content:flex-end;margin-top:7vh"}>
      <Link to="/cart"><i className="fa fa-shopping-cart" Style={"font-size: 33px;margin-right: 22px;"}></i></Link>
      <Link to="/order"><h4 Style={"    font-family: monospace;font-size: 18px;background: #f5f1f1;width: 146px;text-align: center; height: 36px;padding: 7px 17px; border: 1px solid #eae0e0ad;"}>Your Orders</h4></Link>
      
      </div>
        <div className="name">
          <h1 className="text-uppercase text-center">HELLO, {user.name}</h1>
        </div>
        <table
          className="table"
          Style={
            "    width: 100%; max-width: 70%;  margin: 0px auto; margin-bottom: 20px; margin-top: 6vh;"
          }
        >
          <tbody>
            <tr>
              <th scope="row">name</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={user.name}
                    onChange={(e)=>setUser({...user,name:e.target.value})}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">email</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="email"
                    className="form-control"
                   value={user.email}
                   readOnly
                    
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">mobile Number</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="number"
                    className="form-control"
                    value={user.mobile}
                    onChange={(e)=>setUser({...user,mobile:e.target.value})}
                    required
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Mobile Number Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">address</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="text"
                    className="form-control"
                   value={user.address}
                   onChange={(e)=>setUser({...user,address:e.target.value})}
                    required
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Address Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">landmark</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="text"
                    className="form-control"
                   value={user.landmark}
                   onChange={(e)=>setUser({...user,landmark:e.target.value})}
                    required
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter landmark Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">pincode</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="number"
                    className="form-control"
                   value={user.pincode}
                   onChange={(e)=>setUser({...user,pincode:e.target.value})}
                    required
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Pincode Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">city</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="text"
                    className="form-control"
                    value={user.city}
                    onChange={(e)=>setUser({...user,city:e.target.value})}
                    required
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter city Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">State</th>
              <td>
                <div
                  className="mb-3 "
                  Style={"margin: 0vw auto; width: 70%;"}
                >
                  <input
                    type="text"
                    className="form-control"
                   value={user.state || ""}
                   onChange={(e)=>setUser({...user,state:e.target.value})}
                    required
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter State Here"
                    Style={
                      "    padding: 2.25vh 1vw;border: 0px solid rgba(0, 0, 0, 0.5); color: #000000a6;"
                    }
                  />
                </div>
              </td>
            </tr>
            <tr>
            <th scope="row">
            <button type="submit" className="btn " onClick={(e)=>updateUser(e)}  Style={"padding: 11px 49px;font-size: 21px;margin-top:20px; color: black;border: 1px dashed black;"}>
            Update
          </button>
            </th>    
            <td> <button type="submit" className="btn " onClick={logout} Style={"padding: 11px 49px;margin-top:20px;font-size: 21px; color: black;border: 1px dashed black;"}>
            LogOut
          </button><button type="submit" className="btn " onClick={ResetPassword} Style={"padding: 11px 49px;margin-top:20px;margin-left:30px;font-size: 21px; color: black;border: 1px dashed black;"}>
            Reset Password
          </button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
