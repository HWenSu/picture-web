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
  const [isLoading, setIsLoading]=useState(true)

  useEffect(()=>{
    // user 還沒載入時，直接返回，不做任何操作
    if (user === undefined) return;
    // 沒有登入的情況
    if (!user) {
      setIsAlert(true);
      setTimeout(() => setIsAlert(false), 1500);
      setTimeout(() => setIsLoading(false), 500); // 防止 isLoading 太快消失，導致畫面閃爍
      //如果 user 還未初始化，直接返回，等待下一次渲染
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true)
      try{
        const querySnapshot = await getDocs(
        collection(db, `users/${user.uid}/favorites`)
        );
        setFavorites(querySnapshot.docs.map((doc) => doc.data()));
      } catch(error){
        console.error('Error fetching favorites:', error)
      }
      setIsLoading(false);
    };
  fetchFavorites();
  }, [user]) // 當 user 初始化完成後，重新執行 useEffect

  //先判斷是否是 isLoading 
  if(isLoading){
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    )
  }
  //再檢查是否登入
  return user?(
    <div className='favorite-container'>
      <Waterfall
      data={favorites}
      width={window.innerWidth}
      />
  </div>):(
    <div className='non-login-page'>
      {isAlert&& <AlertModal content={'Please login to access Favorite'}/>} 
     <Login/>
    </div>
  )
}

export default Favorite