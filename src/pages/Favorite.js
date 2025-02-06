import {useState, useEffect} from 'react'
import { db } from '../firebase'
import {collection, getDoc, getDocs} from "firebase/firestore"
import { useAuth } from '../context/AuthContext'
import Waterfall from '../components/Waterfall'

const Favorite = () => {
  const {user} = useAuth()
  const [favorites, setFavorites]=useState([])

  useEffect(()=>{
        if(!user){
        //如果 user 還未初始化，直接返回，等待下一次渲染
        return
      }
    const fetchFavorites = async ()=> {
      const querySnapshot = await getDocs(collection(db,`users/${user.uid}/favorites`))
      setFavorites(querySnapshot.docs.map((doc)=>doc.data()))
    }
    fetchFavorites()
  }, [user])// 當 user 初始化完成後，重新執行 useEffect




  return (
    <div>
      <Waterfall
      // imgURL={imgURL()}
      data={favorites}
      width={window.innerWidth}
      isRenderHeartIcon={true}
      />
  </div>
  )
}

export default Favorite