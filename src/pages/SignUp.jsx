import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

const onSubmit = async (e) => {
  e.preventDefault()
  try {
    const auth = getAuth()

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    const user = userCredential.user

    updateProfile(auth.currentUser, {
      displayName: name
    })

    // Save user to firestore
    // Copying the name, email and password from form data
    const formDataCopy = {...formData}
    // Deleting the password so that it won't be added to the database
    delete formDataCopy.password
    // Setting timestamp
    formDataCopy.timestamp = serverTimestamp()

    // Update the database and add it to the users collection
    await setDoc(doc(db, 'users', user.uid), formDataCopy)
    // End save user to firestore

    navigate('/')
  } catch (error) {
      console.log(error)
  }
}


  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input 
            type={showPassword ? 'text' : 'password'} 
            className='passwordInput'
            placeholder='Password'
            id='password'
            value={password}
            onChange={onChange}
            />
            <img src={visibilityIcon} alt="show password" onClick={() => setShowPassword((prevState) => !prevState)} className="showPassword" />
          </div>

          <Link to ='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign in instead
        </Link>
      </div>
    </>
  )
}
