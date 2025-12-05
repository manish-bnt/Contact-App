import React from 'react'
import { useContext } from 'react'
import { Usercontext } from '../App'
import { useState } from 'react'
import EditPage from './EditPage'
import { useNavigate } from 'react-router-dom'
import '../components/Profile.css'
export default function Profile() {
  const { user, setUser } = useContext(Usercontext)
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()
  const editprofile = () => {
    setIsEdit(true)
  }


  const deleteHandler = async (e) => {
    e.preventDefault()
    navigate('/')
    console.log("delte user, ", user)
    let confirmation = confirm("Are you sure you want to Delete Account")
    if (!confirmation) {
      navigate(-1)
      return
    }
    let res = await fetch('https://contact-app-7nfu.onrender.com/delete-profile',
      {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(user)
      })
    localStorage.removeItem('loguser')
    localStorage.removeItem('contactlists')
    setUser("")


  }
  return (
    !isEdit ?
      <div className='user-profile'>
        <span><i className="fa-solid fa-user"></i></span>
        <p>{user.username}</p>
        {user ?
          <div className='profile-action-btn'>
            <button className='edit-btn' onClick={editprofile}>Edit Profile</button>
            <button className='delete-btn' onClick={deleteHandler}>Delete Account</button>
          </div>
          :
          ""
        }
        <div className="user-profile-info">
          <p><span><i className="fa-solid fa-envelope"></i></span> {user.email}</p>
          {/* <p><span><i className="fa-solid fa-key"></i></span> {user.password}</p> */}
        </div>
      </div>
      :
      <EditPage isEdit={setIsEdit} />
  )
}
