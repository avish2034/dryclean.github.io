import axios from "axios";
import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const Navigation = (props) => {
  const [user, setuser] = useState({})
  const getDetail = async (req,res)=>{
    if(Cookies.get("id")){
      const user = await axios.get(`https://dryclean.onrender.com/api/v1/user/detail/${Cookies.get("id")}`)
      console.log(Cookies.get("id"));
      if(user.data.success){
        setuser(user.data.user)
      }
      console.log(user.data.user)
    }
  }
  useEffect(()=>{
    getDetail()
  },[])
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            DryClean
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="/#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="/#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="/#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="/#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
            <Link to="/services">services</Link>
            </li>
            <li>
              {/*<a href="" className="page-scroll">*/}
              {user.name ? (
                <Link to="/profile">{user.name}</Link>
              ) : (
                <Link to="/login">login</Link>
              )}
              {/* </a>*/}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
