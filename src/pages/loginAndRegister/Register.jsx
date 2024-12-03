import React from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

const Register = () => {
  const nav = useNavigate();

  const handletoLogin = () => {
    nav('/login');
  }

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Registration</h2>
        <form>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <input
              type="text"
              placeholder="Enter your User Name"
            />
            <input
              type="number"
              placeholder="Enter your BGMI ID"
            />
            <input
              type="password"
              placeholder="Enter your Password"
            />
           
            <input
              type="password"
              placeholder="Re-Enter your Password"
            />
            <button className='register-btn' onClick={handletoLogin}>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register