import React, {useState} from 'react'
import LoginModal from './LoginModal'

const Login = () => {
  //Login按鈕點擊狀態
  const [isClicked, setIsClicked] = useState(false)

  const loginHandler = () => {
    setIsClicked(!isClicked)
  }

  return (
    <>
    <button onClick={loginHandler} className='login-btn'>
      Login
    </button>
    {isClicked&& <LoginModal/>}
    </>

  )
}

export default Login