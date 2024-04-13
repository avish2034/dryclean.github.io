import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import SlideBar from "./SlideBar";
import video from "./home.mp4";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import '../style.css'
import "./clothComponent.css";
const Cloths = () => {
  const [data, setdata] = useState([]);
  const [cloth, setcloth] = useState()
  const navigate= useNavigate()
  const getClothdetails = async () => {
    if (!localStorage.getItem("category")) {
      toast.error("Cloth Data Not Found");
      return;
    }
    const cloth = await axios.get(
      `https://dryclean.onrender.com/api/v1/cloth/getCloths/${localStorage.getItem(
        "category"
      )}`
    );
    if (cloth.data.success) {
      setdata(cloth.data.cloths);
      setcloth(cloth.data.cloths[0].categoryType.name)
      console.log(cloth.data.cloths);
    } else {
      toast.error(cloth.data.message);
    }
  };
  const getItems = async (id)=>{
    navigate("/items")
    localStorage.setItem('cloth',id)
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
        <h1 className="h1"Style={"text-transform:uppercase"}>{cloth}</h1>
        </div>
      </div>
      <div className="mt-5" style={{ "margin-top": "13vh" }}>
      <div class="card-section">
        
        {data &&
          data.map((data, index) => {
            return (
              <div className="card" key={index} onClick={()=>getItems(data._id)}>
                <div className="card-image">
                  <img src={data.image.url} alt="" />
                </div>
                <div className="card-body">
                  <h2>{data.name}</h2>
                  <p>{data.description}</p>
                </div>
              </div>
            );
          })}
          </div>
      </div>
    </div>
  );
};

export default Cloths;
