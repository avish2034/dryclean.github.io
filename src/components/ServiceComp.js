import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "./navigation";
const ServiceComp = (props) => {
  const [categories, setcategories] = useState({});
  const navigate = useNavigate()
  const getAllCategories = async (req, res) => {
    const category = await axios.get(
      "https://dryclean.onrender.com/api/v1/category/get-all"
    );
    if (category.data.success) {
      setcategories(category.data.categories);
      // console.log(category.data.categories)
    }
    console.log(categories);
  };
  const AllCloth =  (id) => {
    
        localStorage.setItem("category",id)
        navigate("/cloths")
    
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div id="services" className="text-center">
    <Navigation />
      <div className="container" Style={"padding-left:7px;padding-right:7px"}>
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit duis sed dapibus leonec.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit duis sed dapibus leonec.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit duis sed dapibus leonec.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit duis sed dapibus
            leonec.Lorem ipsum dolor sit amet, consectetur adipiscing elit duis
            sed dapibus leonec.
          </p>
        </div>
        <div className="row" Style={"    width: 100%;margin:0px auto;"}>
          {categories[0]
            ? categories.map((d, i) => (
                <div
                  key={i}
                  className="col-md-4"
                  Style={
                    "margin-left:2vw;  margin-bottom:4vh;margin-top:4vh;    height: 25%;width: 21%;     cursor: pointer;}"
                  }
                  onClick={() => AllCloth(d._id)}
                >
                  {" "}
                  <img
                    src={d.image.url}
                    alt={d.name}
                    Style={" width: 100%;padding:20px 0px;border-radius: 50%;"}
                  />
                  {/* <div className="service-desc">
                    <h3>{d.name}</h3>
            </div>*/}
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};

export default ServiceComp;
