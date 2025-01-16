import React, {useState} from 'react'
import LoginModal from './LoginModal'

const Login = () => {
  //Login按鈕點擊狀態
  const [isClosed, setIsClosed] = useState(true)

  const loginHandler = () => {
    setIsClosed(!isClosed)
  }

  const onClose = ()=> {
    setIsClosed(true)
  }

  return (
    <>
    <button onClick={loginHandler} className='login-btn'>
      Login
    </button>
     <LoginModal isClosed={isClosed} onClose={onClose} />
    </>

  )
}

export default Login