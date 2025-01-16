import React, {useState} from 'react'
import {  Link } from "react-router-dom";
import SignUp from '../pages/SignUp'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../components/firebase';


const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("登入成功:", userCredential.user);
  } catch (error) {
    console.error("登入失敗:", error.message);
  }
};


const LoginModal = () => {

  //獲取帳號密碼
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <div className='login-container'>
      <button className='close-btn'>X</button>
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
    </div>
  )
}

export default LoginModal