import React, {useState, useEffect} from 'react'
import {  Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../components/firebase';

//onClose為回調函示, 當關閉按鈕被點擊時, 觸發父組件onClose函式
const LoginModal = ({isClosed, onClose}) => {

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
  
 
  
  return (
    !isClosed? (
    <div className='login-container'>
      <button className='close-btn' onClick={onClose}>X</button>
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
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>) : null
  )
}

export default LoginModal