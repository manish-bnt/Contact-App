import React, { useState } from 'react'
import '../components/signup.css'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const signupHandler = async (e) => {
    e.preventDefault()
    navigate('/user/signin')
    setFormData({ username: "", email: "", password: "" })
    let res = await fetch('https://contact-app-7nfu.onrender.com/signup',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData)
      })

    let data = await res.json()
    alert(data.msg)
    console.log("signup res from backend", data)
  }
  return (
    <>
      <form className='signup-form' onSubmit={signupHandler} >
        <h1 className='signup-head'>Create Your Account!</h1>

        <input type="text"
          name='username'
          value={formData.username}
          onChange={inputHandler}
          placeholder='Username' />

        <input type="email"
          name='email'
          value={formData.email}
          onChange={inputHandler}
          placeholder='Enter email' />

        <input type="password"
          name='password'
          value={formData.password}
          onChange={inputHandler}
          placeholder='Enter Password' />

        <button type='submit'>Signup</button>
      </form>
    </>
  )
}
