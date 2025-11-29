import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Usercontext } from '../App'
import { useNavigate } from 'react-router-dom'
import '../components/signin.css'
export default function Signin() {
  const { user, setUser, setLog } = useContext(Usercontext)

  let navigate = useNavigate()
  const [logInput, setlogInput] = useState({
    username: "",
    email: "",
    password: ""
  })

  const inputHandler = (e) => {
    setlogInput({ ...logInput, [e.target.name]: e.target.value })
  }

  const signinHandler = async (e) => {
    e.preventDefault()
    console.log("User login input", logInput)
    let res = await fetch('https://contact-app-7nfu.onrender.com/signin',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(logInput)
      })
    let data = await res.json()
    if (!res.ok) {
      alert(data.msg)
      return
    }
    localStorage.setItem("loguser", JSON.stringify(data.logged))
    localStorage.setItem("islogin", true)
    setLog(true)
    setUser(data.logged)//immediately store data in global
    alert(data.msg)//alert success msg
    navigate('/')

  }



  return (
    <>
      <form className='signin-form' onSubmit={signinHandler} >
        <h1 className='signin-head'>Login Your Account!</h1>
        <input
          type="text"
          placeholder='Username'
          name='username'
          value={logInput.username}
          onChange={inputHandler}
        />
        <input
          type="password"
          placeholder='Password'
          name='password'
          value={logInput.password}
          onChange={inputHandler}
        />
        <button type='submit'>Signin</button>
      </form>
    </>
  )
}
