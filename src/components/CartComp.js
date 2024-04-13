import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
const CartComp = ({data,item,image,category,cloth}) => {
    console.log(data,item,image);
  const [cart, setcart] = useState({});
const [items, setitems] = useState()
const navigate = useNavigate();
const updateCart = async(e,id)=>{
    if(!Cookies.get('id')){
        toast.worn('User unauthenticated')
        return;
    }
    if(cart.quantity <=0){
      toast.warn("Quantity cannt be lessathan or equal to 0")
      return;
    }
    e.preventDefault();
    const update = await axios.put(`https://dryclean.onrender.com//api/v1/cart/update/${id}`,{
        quantity:cart.quantity,
        _id:Cookies.get('id')
    })
    if(update.data.success){
        toast.success("Cart Updated")
        navigate(0)
    }
    else{
        toast.error(update.data.message)
    }
}
const deleteCart = async(e,id)=>{
    if(!Cookies.get('id')){
        toast.worn('User unauthenticated')
        return;
    }
    e.preventDefault();
    const update = await axios.delete(`https://dryclean.onrender.com//api/v1/cart/delete/${id}/${Cookies.get('id')}`)
    if(update.data.success){
        toast.success(update.data.message)
        navigate(0)
    }
    else{
        toast.error(update.data.message)
    }
}
  useEffect(() => {
    setcart(data);
    setitems(item.image)
  }, []);
  console.log(cart,items);
  return (
    
    
      <tr Style={"text-align:center"} >
        <td data-th="Product" Style={"width:60%"}>
          <div class="row">
            <div class="col-md-3 text-left">
              <img
                src={item.image.url}
                alt=""
                class="img-fluid  d-none d-md-block rounded mb-2 shadow "
                Style={"width:200px"}
              />
            </div>
            <div class="col-md-7 text-left mt-sm-5" Style={"padding-left:14%"}>
              <h4>{category.name}-{cloth.name}-{item.name}</h4>
            </div>
          </div>
        </td>
        <td data-th="Price" Style={"width:12%"}>{cart.total}</td>
        <td data-th="Quantity" Style={"width:10%"}>
          <input
            type="number"
            class="form-control form-control-lg text-center"
            value={cart.quantity}
            onChange={(e)=>setcart({...cart,quantity:e.target.value})}
          />
        </td>
        <td class="actions" data-th="" Style={"width:16%;text-align:center"}>
          <div class="text-center">
            <button class="btn btn-white border-secondary bg-white btn-md ml-2 mb-2" onClick={(e)=>updateCart(e,cart._id)}>
              <i class="fa fa-refresh"></i>
            </button>
            <button class="btn btn-white border-secondary bg-white btn-md ml-2 mb-2"
            onClick={(e)=>deleteCart(e,cart._id)}>
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
  );
};

export default CartComp;
