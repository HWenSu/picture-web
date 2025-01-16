import React from 'react'
import {  Link } from "react-router-dom";
import SignUp from '../pages/SignUp'

const LoginModal = () => {
  return (
    <div className='login-container'>
      <button className='close-btn'>X</button>
      <h3>Login</h3>
      <div className='login-input-area'>
        <label htmlFor='account'>Account:</label>
        <input type='text' id='account' required></input>
      </div>
      <div className='login-input-area'>
        <label htmlFor='password'>Password:</label>
        <input type='text' id='password' required></input>
      </div>
      <div>
        <p>Don’t you have an account? </p>
        <button><Link to="/sign-up">Sign Up</Link></button>
      </div>
    </div>
  )
}

export default LoginModal