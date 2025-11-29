import React from 'react'
import { useContext } from 'react'
import { Usercontext } from '../App'
import { useState } from 'react'
import '../components/EditPage.css'
import { useNavigate } from 'react-router-dom'
export default function EditPage({ isEdit }) {
  const { user, setUser } = useContext(Usercontext)
  const [editInput, setEditInput] = useState(user)
  const navigate = useNavigate()
  const inputHandler = (e) => {
    setEditInput({ ...editInput, [e.target.name]: e.target.value })
  }

  const updateHandler = async (e) => {
    e.preventDefault()
    isEdit(false)
    let res = await fetch('https://contact-app-7nfu.onrender.com/update',
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ oldData: user, newData: editInput })
      })
    let data = await res.json() //{msg:update successfully , alterData: {...}}
    console.log("updated data ", data)
    alert(data.msg)
    setUser(data.alterData)
    localStorage.setItem('loguser', JSON.stringify(data.alterData))
  }

  return (
    <form className='user-edit-form'>
      <h1 className='user-edit-head'>Edit Your Profile</h1>
      <input
        type="text"
        placeholder='username'
        name='username'
        value={editInput.username}
        onChange={inputHandler}
      />
      <input
        type="email"
        placeholder='email'
        name='email'
        value={editInput.email}
        onChange={inputHandler}
      />
      <input
        type="password"
        placeholder='password'
        name='password'
        value={editInput.password}
        onChange={inputHandler}
      />
      <button className='edit-submit' onClick={updateHandler}>Update</button>
      <button onClick={() => navigate(-1)} className='edit-cancel'>Cancel</button>
    </form>
  )
}
