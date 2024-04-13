import React, { useEffect, useState } from "react";
import { Navigation } from "./navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
const Order = () => {
  const [order, setorder] = useState([]);
  const [orderid, setOrderid] = useState("");

  const navigate = useNavigate();
  const GetUserOrder = async (req, res) => {
    if (!Cookies.get("id")) {
      toast.error("User Unauthorized");
      return;
    }
    const orders = await axios.get(
      `http://localhost:401/api/v1/order/user/${Cookies.get("id")}`
    );
    if (orders.data.success) {
      setorder(orders.data.data);
      console.log(order);
    } else {
      toast.success("Please !! Add Some Order");
    }
  };
  const getOrderDetails = async (id) => {
    localStorage.setItem("orderID", id);
    navigate("/order/show");
  };
  const convertToDate = (date) => {
    let date1 = new Date(date);
    const localeDate = date1.toLocaleDateString("en-IN");
    return localeDate;
  };
  const getOrderByID = async () => {
    try {
      if (!Cookies.get("id")) {
        toast.error("User Unauthorized");
        return;
      }
      if (!orderid) {
        GetUserOrder();
        return;
      }
      const orders = await axios.get(
        `http://localhost:401/api/v1/order/user/${orderid}/${Cookies.get("id")}`
      );
      if (orders.data.success) {
        setorder(orders.data.data);
        console.log(order);
      } else {
        console.log("Order Not Found");
        GetUserOrder()
      }
    } catch (error) {
      console.log(error);
      toast.warn("Order Not Fetch");
      GetUserOrder()

    }
  };
 const getOrderByDate = async(date)=>{
  try {
    if (!Cookies.get("id")) {
      toast.error("User Unauthorized");
      return;
    }
    if (!date) {
      GetUserOrder();
      return;
    }
    const orders = await axios.get(
      `http://localhost:401/api/v1/order/user/date/${date}/${Cookies.get("id")}`
    );
    if (orders.data.success) {
      setorder(orders.data.data);
      console.log(order);
    } else {
      console.log("Order Not Found");
      GetUserOrder()
    }
  } catch (error) {
    console.log(error);
    toast.warn("Order Not Fetch");
    GetUserOrder()

  }
 }
  const ClearOrderID = async(req,res)=>{
    setOrderid("");
    GetUserOrder()
  }
  useEffect(() => {
    GetUserOrder();
  }, []);
  return (
    <div>
      <Navigation />

      <div className="container" Style={"Padding-top:14vh;text-align:center"}>
      <div Style={"width:95%;display:flex;justify-content:space-between;margin:0px auto"}>
        <form
        action=""
        className=" border border-slate-200 px-0 h-11 w-[50%]"
        Style={"border:1px solid #70809085;height:35px;width:50%;padding: 5px 2px;"}
      >
        <input
          type="text"
          value={orderid}
          name="oid"
          Style={"width:50%;margin:0px 5px;outline:none;border:none"}
          id=""
          className=" w-[60%] mx-2 outline-none"
          placeholder="Order ID"
          onChange={(e) =>
            setOrderid(e.target.value)
          }
        />
        <span className="mx-[2%]" Style={"margin:0px 2%;cursor:pointer"} onClick={ClearOrderID}>
          {orderid ? <i class="fa-solid fa-xmark">X</i> : <span></span>}
        </span>
        <button
          type="button"
          className=" bg-green-500 text-white font-mono w-[25%] my-2"
          onClick={getOrderByID}
          Style={"border: 0px;color: #796e6e;font-size: 19px;margin-left:7%"}
        >
          {" "}
          <i class="fa fa-search"></i>
        </button>
        </form>
          <input
          type="Date"
          Style={
            "    width: 380px;height:40px;padding: 8px; border-radius: 5px;border-color: #7f6f6f4f;color: gray; margin-left:70%;outline:none;    font-family: monospace;font-size: 17px;"
          }
          onChange={(e) => getOrderByDate(e.target.value)}
          placeholder="Search With OrderID"
  />
  </div>
        <div className="order" Style={"padding:8px"}>
          <table class="table table-striped">
            <thead className="" Style={"position:sticky"}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">OrderID</th>
                <th scope="col">Order Date</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Order Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((data, index) => {
                  return (
                    <tr Style={"text-align:center"}>
                      <th scope="row">{index + 1}</th>
                      <td>#{data._id}</td>
                      <td>{convertToDate(data.createdAt)}</td>
                      <td>{data.totalAmount}</td>
                      <td>{data.payment_status.toUpperCase()}</td>
                      <td>{data.orderStatus || "-"}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => getOrderDetails(data._id)}
                          class="btn btn-outline-primary"
                        >
                          Show
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
