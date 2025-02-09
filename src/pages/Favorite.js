import {useState, useEffect} from 'react'
import { db } from '../firebase'
import {collection, getDoc, getDocs} from "firebase/firestore"
import { useAuth } from '../context/AuthContext'
import Waterfall from '../components/Waterfall'
import AlertModal from '../components/AlertModal'
import Login from '../components/Login'

const Favorite = () => {
  const {user} = useAuth()
  const [favorites, setFavorites]=useState([])
  const [isAlert, setIsAlert]=useState(false)

  useEffect(()=>{
        if(!user){
        setIsAlert(true)
        setTimeout(()=>{setIsAlert(false)}, 1500)
        //如果 user 還未初始化，直接返回，等待下一次渲染
        return
      }
    const fetchFavorites = async ()=> {
      const querySnapshot = await getDocs(collection(db,`users/${user.uid}/favorites`))
      setFavorites(querySnapshot.docs.map((doc)=>doc.data()))
    }
    fetchFavorites()
  }, [user, favorites])// 當 user 初始化完成後，重新執行 useEffect


  return (
    user?(
    <div className='favorite-container'>
      <Waterfall
      // imgURL={imgURL()}
      data={favorites}
      width={window.innerWidth}
      />
  </div>):(
    <div className='non-login-page'>
      {isAlert&& <AlertModal content={'Please login to access Favorite'}/>} 
     <Login/>
    </div>
  ))
}

export default Favorite