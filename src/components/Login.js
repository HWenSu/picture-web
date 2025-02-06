import React, {useState, useEffect} from 'react'
import {  Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'


//onClose為回調函示, 當關閉按鈕被點擊時, 觸發父組件onClose函式
const Login = ({onClose}) => {
  

  const {user} = useAuth()
  const navigate = useNavigate()

 
  //獲取帳號密碼
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("登入成功:", userCredential.user);
    } catch (error) {
      console.error("登入失敗:", error.message);
    }
  };

  const handleSignUp = ()=> {
    navigate('/sign-up')
    onClose()
  }
  
  return (
    !user? (
    <div>
      <h3>Login</h3>
      <div className='login-input-area'>
        <label htmlFor='account'>Account:</label>
        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
      </div>
      <div className='login-input-area'>
        <label htmlFor='password'>Password:</label>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  required></input>
      </div>
      <button onClick={()=>handleLogin(email, password)}>Log in</button>
      <div>
        <p>Don’t you have an account? </p>
        <button onClick={handleSignUp}>
          Sign Up
        </button>
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