import React from 'react'
import { useContext } from 'react'
import { Usercontext } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import '../components/Contact.css'
export default function Contact() {
  const { user } = useContext(Usercontext)
  const { index } = useParams()
  const navigate = useNavigate()
  return (
    <>
      {user &&
        < div className='contact-profile'>
          <span><i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left back-arrow"></i></span>
          <span><i className="fa-solid fa-user"></i></span>
          <div className="contact-profile-info">
            <p><b>Name: </b>{user.contacts[index].name}</p>
            <p><b>mobile: </b>{user.contacts[index].mobile}</p>
            <p><b>Email: </b>{user.contacts[index].email}</p>
            <p><b>Address: </b>{user.contacts[index].address}</p>

          </div>
        </div >
      }
      {/* {user &&
        user.contacts.map((c, i) => {
          return <div key={i} style={{
            boxShadow: "2px 3px 7px rgba(255,255,255,0.3)",
            borderRadius: "7px",
            padding: "0.5rem 1rem"
          }}>
            <p><b>Name: </b>{c.name}</p>
            <p><b>mobile: </b>{c.mobile}</p>
            <p><b>Email: </b>{c.email}</p>
            <p><b>Address: </b>{c.address}</p>
          </div>
        })
      } */}
    </>
  )
}
