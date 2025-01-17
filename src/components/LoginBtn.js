import React, {useState} from 'react'
import Login from './Login'

const LoginBtn = () => {
  //Login按鈕點擊狀態
  const [isClosed, setIsClosed] = useState(true)

  const loginHandler = () => {
    setIsClosed(!isClosed)
  }


  return (
  <>
    <button onClick={loginHandler} className='login-btn'>
      Login
    </button>
    {!isClosed? (
    <div className='login-container'>
    <button className='close-btn' onClick={loginHandler}>X</button>
     <Login/>
     </div>
    ) : null}
  </> 
  )
}

export default LoginBtn