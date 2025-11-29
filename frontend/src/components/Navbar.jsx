import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Usercontext } from '../App'
import '../components/Navbar.css'
export default function Navbar() {
  const { setUser, log } = useContext(Usercontext)
  const navigate = useNavigate()



  const logoutHandler = () => {
    let confirmation = confirm("Are you sure you want to logout?")
    if (!confirmation) {
      navigate(-1)
      return
    }
    localStorage.removeItem('loguser')
    localStorage.removeItem('islogin')
    setUser("")
    setLog(false)
  }




  return (
    <nav className='navbar'>
      {
        log ?
          <>
            <Link className='nav-links' to={'/'}>Home</Link>
            <Link className='nav-links' to={'/user/profile'}>Profile</Link>
            <Link className='nav-links' to={'/contact/form'}>Add</Link>
            <Link className='nav-links' onClick={logoutHandler}>Logout</Link>
          </>
          :
          <>
            <Link className='nav-links' to={'/user/signup'}>SignUp</Link>
            <Link className='nav-links' to={'/user/signin'}>LogIn</Link>
          </>
      }
      {/* {
        log ?
          <>
            <Link to={'/'}>Home</Link>
            <Link to={'/user/profile'}>Profile</Link>
            <Link to={'/contact/form'}>Add</Link>
            <Link onClick={logoutHandler} to={'/logout'}>Logout</Link>
          </>
          :
          <>
            <Link to={'/user/signup'}>SignUp</Link>
            <Link to={'/user/signin'}>LogIn</Link>
          </>
      } */}
    </nav>
  )
}
