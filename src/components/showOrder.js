import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./showOrder.css";
import Cookies from "js-cookie";
import logo from "./logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const ShowOrder = () => {
  const [Order, setOrder] = useState({});
  const [carts, setcarts] = useState([]);
  const [user, setUser] = useState({});
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
  const navigate = useNavigate();
  const singleOrder = async () => {
    const Order = await axios.get(
      `https://dryclean.onrender.com/api/v1/order/${localStorage.getItem("orderID")}`
    );
    if (Order.data.success) {
      setOrder(Order.data.data);
      setcarts(Order.data.data.carts_id);
    } else {
      toast.error("Data Not Found");
    }
  };
  const convertToDate = (date) => {
    let date1 = new Date(date);
    const localeDate = date1.toLocaleDateString("en-IN");
    return localeDate;
  };
  const getPdf = ()=>{
    const capture = document.getElementById('bill');

    html2canvas(capture).then((canvas)=>{
      const imgdata = canvas.toDataURL('img/png');
      const doc = new jsPDF('p','mm','a4');
      const componenetWidth = doc.internal.pageSize.getWidth();
      const componenetheight = doc.internal.pageSize.getHeight();
      doc.addImage(imgdata,'PNG',0,0,componenetWidth,componenetheight);
      doc.save('invoice.pdf')
      console.log("save");
    })
  }
  useEffect(() => {
    singleOrder();
    getDetail();
  }, []);
  return (
    <div className="billPage">
      <Navigation />

      <div  id="bill" className="bill">
        <div className="bill-nav">
          <img src={logo} alt="DRYCLEAN" />
          <h3>order Date : {convertToDate(Order.createdAt)}</h3>
        </div>
        <hr />
        <div className="user">
          <h5>
            orderID : <span>{Order._id}</span>
          </h5>
          <h5>
            Cusomer Name : <span>{user.name}</span>
          </h5>
          <div className="em">
            <h5>
              mobile no. <span>{user.mobile}</span>
            </h5>
            <h5>
              Email ID : <span>{user.email}</span>
            </h5>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price(₹)</th>
            </tr>
          </thead>
          <tbody>
            {carts &&
              carts.map((data, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <th>
                      {data.item.clothType.categoryType.name} -{" "}
                      {data.item.clothType.name} - {data.item.name}
                    </th>
                    <th>{data.quantity}</th>
                    <th>{data.total}₹</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="subTotal">
          <h4>
            Delivery Charges : <span>{Order.deliveryCharge}₹</span>
          </h4>

          <h3>
            Sub Total : <span>{Order.totalAmount}₹</span>
          </h3>
        </div>
        <hr/>
        <div id="legalcopy">
						<p class="legal">Hi, {user.name}.  DryClean here. I just wanted to personally thank you for your recent booking.{Order.payment_status=="done"?"We appreciate your business.":" But Your payment is Pending. Please Check It !!"}  Please contact us at 1234567890 if you have any questions. 
						</p>
					</div>

				
      </div>

      <button onClick={()=>getPdf()}>Download Invoice</button>
    </div>
  );
};

export default ShowOrder;
