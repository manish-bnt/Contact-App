import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../App'
import { Navigate } from 'react-router-dom'

export default function Auth({ children }) {
  const { user, log, loading } = useContext(Usercontext)

  if (loading) {
    return <p>Loading...</p>
  }

  if (!log || !user) {
    return <Navigate to="/user/signin" />
  }
  return (
    <>
      {children}
    </>
  )
}
