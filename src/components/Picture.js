import {useState, useEffect} from 'react'
import PictureModal from './PictureModal';
import Collect from './Collect';
import DownloadImage from './DownloadImage';
import ShareURL from './ShareURL';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Picture = ({ data, imgURL, height}) => {


  const {user}=useAuth()
  const [isPictureModal, setIsPictureModal] = useState(false)
  const [favorites, setFavorites] = useState([])
  
  const handlePicture = ()=> {
    setIsPictureModal(!isPictureModal)
  }

  useEffect(() => {
    //初始化收藏數據
    const loadFavorites = async () => {
      if(!user){
        setFavorites([]); // 如果未登入，清空收藏數據
        return
      }
     try {
      const querySnapshot = await getDocs(collection( db, `users/${user.uid}/favorites`))
      const favoriteIds = querySnapshot.docs.map((doc)=> doc.data().id) //提取收藏圖片的id
      setFavorites(favoriteIds)
    } catch (error) {
      console.error("加載失敗:", error)
    }
    }
    loadFavorites()
  }, [user]);

  //確認是data.id是否在收藏數據中
  const isFavorite = favorites.includes(data.id)

  // 收藏狀態變化的回調函數
  const handleFavoriteChange = (id, isFavorited) => {
  setFavorites((prevFavorites) =>
    isFavorited? 
      [...prevFavorites, id] // 新增收藏
      : prevFavorites.filter((favId) => favId !== id) // 移除收藏
    )};

  return (
    <div className="picture">
      <div className='picture-btn-container'>
        <div className='picture-btn' onClick={handlePicture}>
          <div className="imageContainer" style={{ height: height + "px" }}>
          <img src={imgURL} alt={data.alt || "Image"} />
          <a target="_blank" href={imgURL} rel="noreferrer"> </a>
          </div>      
        </div>
          {/* 收藏組件 */}
          <div className='heart-btn'>
            <Collect 
              data={data} 
              isFavorite={isFavorite} 
              onFavoriteChange={handleFavoriteChange} />
          </div>
          {/* 下載組件 */}
           <div className='download-btn'>
              <DownloadImage imgURL={imgURL} fileName={data.id} />
          </div>
          {/* 分享組件 */}
          <div>
            <ShareURL/>
          </div>
      </div>
      <p className="photographer">{data.photographer}</p>

      {/* 是否打開圖片彈出窗 */}
      {isPictureModal&& 
      <PictureModal
      data={data}
      src={imgURL} 
      alt={data.alt || "Image"}  
      photographer={data.photographer}
      url={data.url}
      photographer_url={data.photographer_url}
      handlePicture={handlePicture}
      isFavorite={isFavorite}
      onFavoriteChange={handleFavoriteChange} 
      />}
      
    </div>
  )
};

export default Picture