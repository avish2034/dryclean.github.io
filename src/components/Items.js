import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import SlideBar from "./SlideBar";
import video from "./home.mp4";
import axios from "axios";
import { toast } from "react-toastify";
// import '../style.css'
import "./clothComponent.css";
import Cookies from "js-cookie";
const Items = () => {
  const [data, setdata] = useState([]);
  const [cloth, setcloth] = useState()
  const getClothdetails = async () => {
    if (!localStorage.getItem("cloth")) {
      toast.error("Cloth Data Not Found");
      return;
    }
    const cloth = await axios.get(
      `https://dryclean.onrender.com/api/v1/item/getItems/${localStorage.getItem(
        "cloth"
      )}`
    );
    if (cloth.data.success) {
      setdata(cloth.data.items);
      setcloth(cloth.data.items[0].clothType.name)
      console.log(cloth.data.items);
    } else {
      toast.error(cloth.data.message);
    }
  };
  const addTocart = async(e,id)=>{
    if(!Cookies.get('id')){
      toast.warn("User Unauthenticated")
    }
    e.preventDefault();
    console.log(id);
    console.log(Cookies.get('id'));
    const addCart = await axios.post(`https://dryclean.onrender.com/api/v1/cart/add/${id}`,{
      id:Cookies.get('id')
    })
    if(addCart.data.success){
      toast.success("Item Added In Cart")
    }
    else{
      toast.error(addCart.data.message)
    }
  }
  useEffect(() => {
    getClothdetails();
    console.log(data);
  }, []);
  return (
    <div>
      <Navigation />
      <div className=" mt-3">
        <video
          src={video}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            zIndex: "-1",
            width: " 100%",
            height: "50vh",
            "margin-top": "11vh",
          }}
          autoPlay
          muted
          loop
          id="myVideo"
        ></video>
        <div
          style={{
            position: "relative",
            top: "11vh",
            zIndex: "1",
            background: "rgba(0,0,0,0.7)",
            height: "50%",
            width: "100%",
          }}
        >
        <h1 className="h1" Style={"text-transform:uppercase"}>{cloth}</h1>
        </div>
      </div>
      <div className="mt-5" style={{ "margin-top": "13vh" }}>
      <div class="card-section">
        
        {data &&
          data.map((data, index) => {
            return (
              <div className="card">
                <div className="card-image">
                  <img src={data.image.url} alt="" />
                </div>
                <div className="card-body">
                  <h2>{data.name}</h2>
                  <p>Rs.{data.price}/piece</p>
                  <p>{data.description}</p>
                  <button onClick={(e)=>addTocart(e,data._id)}> Add To Cart</button>
                </div>
              </div>
            );
          })}
          </div>
      </div>
    </div>
  );
};

export default Items;
