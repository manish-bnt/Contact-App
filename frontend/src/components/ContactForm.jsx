import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Usercontext } from '../App'
import { useNavigate } from 'react-router-dom'
import '../components/ContactForm.css'
export default function ContactForm() {
  const { user, setUser } = useContext(Usercontext)
  const navigate = useNavigate()
  const [addForm, setAddForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  })

  const formHandler = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value })
  }

  const saveHandler = async (e) => {
    e.preventDefault()
    for (let key in addForm) {
      if (addForm[key] === "") {
        alert("Input cannot be empty. Please enter a value!")
        return
      }
    }
    let res = await fetch('https://contact-app-7nfu.onrender.com/addform',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ loguser: user, contact: addForm })
      })
    let data = await res.json()
    if (res.ok) {
      navigate('/')
      setUser(data.newData)
      localStorage.setItem('loguser', JSON.stringify(data.newData))
      setAddForm({ name: "", mobile: "", email: "", address: "" })
      alert(data.msg)
      console.log("backend response ", data)
      return
    }
    alert(data.msg)


  }
  return (
    <form className='add-contact-form' onSubmit={saveHandler}>
      <h1 className='contact-form-head'>Add Your Contact List</h1>
      <input
        type="text"
        placeholder='name'
        name='name'
        value={addForm.name}
        onChange={formHandler}
      />

      <input
        type="number"
        placeholder='mobile'
        name='mobile'
        value={addForm.mobile}
        onChange={formHandler}
      />

      <input
        type="email"
        placeholder='email'
        name='email'
        value={addForm.email}
        onChange={formHandler}
      />

      <input
        type="text"
        placeholder='address'
        name='address'
        value={addForm.address}
        onChange={formHandler}
      />

      <button type='submit'>Save</button>
    </form>
  )
}
