import React, { useContext } from 'react'
import Contact from './Contact'
import { Usercontext } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import '../components/Home.css'
export default function Home() {
  const { user, setUser } = useContext(Usercontext)
  const navigate = useNavigate()
  const viewHandler = (contact, index) => {
    navigate(`/view-contact/${index}`)
  }

  const deleteHandler = async (contact, index) => {
    let confirmation = confirm(`Are you sure to delete \n "${contact.name}" `)
    if (!confirmation) return

    let res = await fetch('https://contact-app-7nfu.onrender.com/delete-contact',
      {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ loguser: user, reqDelete: index })
      })

    let data = await res.json()
    console.log("backend deleted contact response ", data)
    alert(data.msg)
    setUser(data.newData)
    localStorage.setItem('loguser', JSON.stringify(data.newData))
  }
  return (
    <section className='home-sec'>
      <h1>Welcome {user.username}</h1>
      <p>Your Contact Lists</p>
      <div className='contact-list-wrap'>
        {user.contacts &&
          user.contacts.map((c, i) => {
            return <div className='contact-list' key={i}>
              <div className='contact-info'>
                <span><i className="fa-solid fa-user"></i></span>
                <p>{c.name}</p>
              </div>
              <div className='contact-action'>
                <button onClick={() => viewHandler(c, i)}>View</button>
                <button onClick={() => deleteHandler(c, i)}>Delete</button>
              </div>
            </div>
          })
        }

        {/* <Contact /> */}
      </div>
    </section>
  )
}
