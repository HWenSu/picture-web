import React, { useState,useEffect } from 'react'
import UploadImages from '../components/UploadImages';
import { useAuth } from '../context/AuthContext'
import Login from '../components/Login';
import AlertModal from '../components/AlertModal';

const Portfolio = () => {
  const {user} = useAuth()
  const [isAlert, setIsAlert] = useState(false)

  useEffect(()=>{
    if(!user){
      setIsAlert(true)
      setTimeout(()=>{
        setIsAlert(false)
      }, 1500)
    }
  }, [user])

  return (
    user?(
    <div>
      <UploadImages />
    </div>):(
    <div className='non-login-page'>
      { isAlert&& <AlertModal content={'Please log in first to access portfolio'}/>}
      <Login/>
    </div>
    )
  );
}

export default Portfolio