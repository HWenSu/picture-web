import React from 'react'

const AcountAndPassport = () => {
  return (
    <div>
      <div className='login-input-area'>
        <label for='account'>Account:</label>
        <input type='text' id='account' required></input>
      </div>
      <div className='login-input-area'>
        <label for='password'>Password:</label>
        <input type='text' id='password' required></input>
      </div>
  </div>
  )
}

export default AcountAndPassport