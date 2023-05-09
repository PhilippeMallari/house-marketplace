import React from 'react'
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Profile() {
  const auth = getAuth()
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {ame, email} = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">
          My Profile
        </p>
        <button type='button' className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  )
}
