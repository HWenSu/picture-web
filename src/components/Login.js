import React, {useState, useEffect} from 'react'
import {  Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'
import AlertModal from './AlertModal';

//onClose為回調函示, 當關閉按鈕被點擊時, 觸發父組件onClose函式
const Login = ({onClose, loginBtnClicked}) => {
  const {user} = useAuth()
  const navigate = useNavigate()

  //獲取帳號密碼
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //登入失敗
  const [loginError, setLoginError] = useState(false)
  
  //計時關閉回調函數
  const closeTimer = ()=>{
    setTimeout(()=>{
      onClose()
    }, 3000)
  }
  
  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if(loginBtnClicked){ closeTimer()} 
    } catch (error) {
      setLoginError(true)
      setTimeout(()=>{setLoginError(false)}, 2000)
      console.error("登入失敗:", error.message);
    }
  };

  const handleSignUp = ()=> {
    navigate('/picture-web/sign-up')
    onClose()
  }
  
  return (
    !user? (
    <div className='login-content-container'>
      <h3>Login</h3>
        <div className='login-input-area'>
          <label htmlFor='account'>Account:</label>
          <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
        </div>
        <div className='login-input-area'>
          <label htmlFor='password'>Password:</label>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  required></input>
      </div>
      <button onClick={()=>handleLogin(email, password)} className='dark-btn'>Log in</button>
      <div className='sign-up-section'>
        <p>Don’t you have an account? </p>
        <button onClick={handleSignUp} className='light-btn' >
          Sign Up
        </button>
        {loginError&& <AlertModal content={'Login failed, please try again.'}/>}
      </div>
    </div>): (
      <div>
        <p>Welcome,</p>
        <p>
         {user.email}</p>
      </div>
    )
  )
}

export default Login