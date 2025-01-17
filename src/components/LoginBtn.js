import React, {useState} from 'react'
import Login from './Login'
import Logout from './Logout'
import { useAuth } from '../context/AuthContext'

const LoginBtn = () => {

  const {user} = useAuth()  

  //Login按鈕點擊狀態
  const [isClosed, setIsClosed] = useState(true)

  const onClose = () => {
    setIsClosed(!isClosed)
  }

  return (
  <>
  {/* 依據是否有user資料判斷顯示按鈕 */}
    {!user? (
    <button onClick={onClose} className='login-btn'>
      Login
    </button> ): (  
      < button className='avatar-container' onClick={onClose}  >
         <img className='avatar' src={"/images/images.jpeg"} alt={user.email}/>
      </button>
  )}
  {/* 顯示或關閉彈出窗 */}
    {!isClosed? (
    <div className='login-container'>
     <Login onClose={onClose} />
     {user&& <Logout onClose={onClose} />}
    </div>
    ) : null}
  </> )
}

export default LoginBtn