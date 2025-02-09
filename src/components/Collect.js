import {useState} from 'react'
import {db} from "../firebase" //引入Firestore 和 Authentication
import {doc, setDoc, deleteDoc} from "firebase/firestore" // 從 Firestore 引入 `doc` 和 `setDoc`，用於創建/修改 Firestore 文檔。
import { useAuth } from '../context/AuthContext'
import AlertModal from './AlertModal'


const Collect = ({data, isFavorite, onFavoriteChange}) => {
  const {user} = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [isRemovedBtn, setIsRemovedBtn] = useState(false)

  
  const onCancel = ()=>{
    if(isRemovedBtn){
    setIsProcessing(false)
    setIsRemovedBtn(false)
    }
  }

  const onConfirmRemoved = async () => {
    if(isFavorite && isRemovedBtn){
    try {
      const docRef = doc(db, `users/${user.uid}/favorites`, `${data.id}` )
      await deleteDoc(docRef)
      onFavoriteChange(data.id, false) // 通知父組件
    } catch (error) {
      console.log('收藏移除失敗', error)
    } finally {
      setIsRemovedBtn(false)
    }}
  }

  const toggleFavorite = async() => {
    //防止重複點擊
    if(isProcessing){
      setIsProcessing(true)
    }
    //顯示彈出框
    if(!isRemovedBtn && isFavorite){
      setIsRemovedBtn(true)
      return
    } 
      try{
        //建構firebase文檔路徑
        const docRef = doc(db, `users/${user.uid}/favorites`, `${data.id}` )
        //收藏圖片
          await setDoc(docRef, {
            id: data.id,
            src : data.src,
            photographer: data.photographer,
            alt: data.alt,
            url: data.url,
            photographer_url: data.photographer_url,
            width: data.width,
            height: data.height,
          })
        onFavoriteChange(data.id, true) // 通知父組件
      }catch (error){
        setIsAlert(true)
        setTimeout(()=>{setIsAlert(false)},2000)
      console.error("收藏失敗：", error)
      } finally {
        setIsProcessing(false)
      }
}

  return (
    <div onClick={toggleFavorite} className='common-icon heart'>
      {isFavorite? (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
      <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
      </svg>
    ):(
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
    </svg>)
      }
      {isAlert&& <AlertModal content={'Please login first'}/>}
      {isRemovedBtn&& 
      <>
        <AlertModal 
          content={'Confirm to remove favorites?'} 
          confirmBtn={true} 
          onCancel={onCancel} 
          onConfirmRemoved={onConfirmRemoved}/>
      </>
      }
    </div>
  )
}

export default Collect