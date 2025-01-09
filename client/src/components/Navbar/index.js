import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import { RxHamburgerMenu } from "react-icons/rx";

import Cookies from 'js-cookie';
import './index.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  

  const toggleMenu = ()=>{setIsOpen(!isOpen)}

  const handleLogout = () => {

    // Remove the token cookie
    Cookies.remove('token'); // Adjust the cookie name according to your setup

    navigate('/login'); // Adjust the route according to your app
  };
  // console.log(isOpen)
  return (
    <div className='nav-con'>
      <h1>Logo</h1>
      <div 
      className={`nav-links-con ${isOpen ? 'active' : ''}`}>
        <Link to='/' style={{ textDecoration: 'none' }}>Home</Link>
        <Link to='/services' style={{ textDecoration: 'none' }}>Our Services</Link>
        <Link to='/contactus' style={{ textDecoration: 'none' }}>Contact Us</Link>
        {user ? <button className='nav-button' onClick={handleLogout}>Logout</button>
          : <button className='nav-button'><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></button>
        }

      </div>

      <div>
        <RxHamburgerMenu className='burger-icon' onClick={toggleMenu} />
      </div>



    </div>
  )
}

export default Navbar