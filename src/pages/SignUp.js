import React, {useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';

const handleRegister = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("註冊成功:", userCredential.user);
    // 將大頭貼設為預設圖片
    await updateProfile(userCredential.user, {
      photoURL:  "/images/images.jpeg",
    })
    console.log("成功更新大頭貼")
  } catch (error) {
    console.error("註冊失敗:", error);
  }
};


const SignUp = () => {
  //獲取帳號密碼
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <h3>SignUp</h3>
      <div className='login-input-area'>
        <label htmlFor='account'>Account:</label>
        <input type='text' id='account' value={email} onChange={(e)=> setEmail(e.target.value) } required></input>
      </div>
      <div className='login-input-area'>
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' value={password} onChange={(e)=> setPassword(e.target.value) } required></input>
      </div>
      <button onClick={()=>handleRegister(email, password)}>Submit</button>
    </div>
  )
}

export default SignUp