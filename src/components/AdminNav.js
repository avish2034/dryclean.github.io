import React from 'react'
// import logo from '../logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './adminNav.css'
const AdminNav = () => {
  const navigate = useNavigate()
  const logout = ()=>{
    //  localStorage.clear('user')
   localStorage.removeItem('user');
   localStorage.removeItem('bookid');
   localStorage.removeItem('studid');
   localStorage.removeItem('iBook');
   if(localStorage.getItem('photo'))
   {
   localStorage.removeItem('photo');

   }
      navigate("/admin")
    
    toast.success("LogOut")
  }
  return (
    <div className=' mt-4 admiinnav  h-12   flex justify-between w-[90%] mx-auto'>
      <Link to="/user/home" Style={"    margin: 12px;color: #00000080; text-decoration: none;  font-size: 27px; font-weight: 700;"} >DryClean</Link>
        
        <ul className='adminul flex w-[50%] mr-3 justify-between my-3'>
            <li className='adminli'><Link to="/user/books" >Orders</Link></li>
            <li className='adminli'><Link to="/admin/category">Category</Link></li>
            <li className='adminli'><Link to="/user/ibooks">Cloths</Link></li>
            <li className='adminli'><Link to="/user/profile">Items</Link></li>
            <li className='adminli'><Link to="/user/profile">Courier</Link></li>
            <li className='adminli'><Link to="/user/profile">Profile</Link></li>
            <li  className=' adminli cursor-pointer' onClick={logout}>LogOut </li>
        </ul>
    </div>
  )
}

export default AdminNav