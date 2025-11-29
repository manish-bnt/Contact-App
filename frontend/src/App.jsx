import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Contacts from './components/Home'
import ContactForm from './components/ContactForm'
import { createContext } from 'react'
import Profile from './components/Profile'
import { useEffect } from 'react'
import ContactPage from './components/Home'
import Contact from './components/Contact'
import Auth from './components/Auth'
import NoPage from './components/NoPage'
export const Usercontext = createContext()
function App() {

  let [user, setUser] = useState("") //global user logged data
  const [log, setLog] = useState("")
  const [loading, setLoading] = useState(true)
  console.log("user-context ", user)
  useEffect(() => {
    let savedLogin = localStorage.getItem("islogin")
    let storedUser = localStorage.getItem("loguser")

    if (savedLogin) {
      setLog(JSON.parse(savedLogin))
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
    // setLoading(false); // FINALLY SET

  }, [])

  // if (loading) {
  //   return <div>Loading...</div>; // PREVENT AUTH CHECK
  // }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <>
              <Auth>
                <ContactPage />
              </Auth>
            </>

          )
        },
        {
          path: 'user/signup',
          element: <Signup />
        },
        {
          path: 'user/signin',
          element:
            <Signin />

        },
        {
          path: 'user/profile',
          element: (
            <Auth>
              <Profile />
            </Auth>
          )
        },
        {
          path: 'contact/form',
          element: (
            <Auth>
              <ContactForm />
            </Auth>
          )
        },
        {
          path: 'logout',
          element: (
            <Auth>
              <Signin />
            </Auth>
          )
        },
        {
          path: 'view-contact/:index',
          element: (
            <Auth>
              <Contact />
            </Auth>

          )
        },
      ]
    },
    {
      path: '*',
      element: <NoPage />
    },
  ])
  return (
    <>
      <Usercontext.Provider value={{ user, setUser, log, setLog, loading, setLoading }}>
        <RouterProvider router={router} />
      </Usercontext.Provider>
    </>
  )
}

export default App
