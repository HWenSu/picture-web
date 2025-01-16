import React from 'react'

const LoginModal = () => {
  return (
    <div className='login-container'>
      <button className='close-btn'>X</button>
      <h3>Login</h3>
      <div className='login-input-area'>
        <label for='account'>Account:</label>
        <input type='text' id='account' required></input>
      </div>
      <div className='login-input-area'>
        <label for='password'>Password:</label>
        <input type='text' id='password' required></input>
      </div>
      <div>
        <p>Don’t you have an account? </p>
        <button>SignUp</button>
      </div>
    </div>
  )
}

export default LoginModal