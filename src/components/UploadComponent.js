import React, { useState, useEffect } from "react";
import axios from 'axios'
import Waterfall from './Waterfall'
import { InView, useInView } from 'react-intersection-observer';


const UploadComponent = () => {
  const [ selected, setSelected ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ isLoading, setIsLoading] = useState(false)
  const baseURL = process.env.REACT_APP_API_BASE_URL
  console.log(baseURL)
  //初始化
  useEffect(()=> {

    //從 API 取得數據
    axios.get(`${baseURL}/images?page=${page}&limit=15`)
        .then(response=> {
          const data = response.data.data
          setSelected(data)
          console.log("圖片訊息", data)
        })
        
        .catch(error => {
          console.error('Error fetching images', error)
        })
    
  }, []) 

  const morePictures = async() => {
    //如果正在加載中則返回
    if(isLoading) return
    //新增頁面+1
    const nextPage = page+1
    const newURL = `${baseURL}/images?page=${nextPage}&limit=15`
    setIsLoading(true)
    try{
      const result = await axios.get(newURL)
      const newImgs = result.data.data
      if(newImgs.length>0){
        setSelected((prev)=>[...prev, ...newImgs])
        setPage(nextPage)
      }
    } catch (error) {
      console.error("Error fetching more pictures:", error);
    } finally {
      //重置加載狀態
      setIsLoading(false)
    }
  }

  //Lazy Load
  const {ref, inView} = useInView ({
    triggerOnce: false,
    root: null,
    rootMargin: `0px 0px ${window.innerHeight}px 0px`,
    onChange: (inView, entry) => {
      console.log('info', inView, entry.intersectionRatio)
      if(inView) {
        morePictures()
      }
    }
  })
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 50 ) {
      alert('最多只能上傳50個檔案')
    }

    const formData = new FormData()
    //把每筆file加入formData中
    files.forEach((file) => {
      formData.append('files', file)
    })

    axios.post(`${baseURL}/upload`, formData)
    .then(response => {
      //重新定義資料格式 匹配pixels API 格式來使用相同PICTURE組件
      const formattedData = response.data
      const updateImages = [...selected, ...formattedData]
      setSelected(updateImages)
    })
    .catch(error => {
      console.error('Error uploading files:', error)
    })
  }

  console.log(selected)
  const vailImg = (selected) => {
    return selected.filter((img) => img?.src?.large)
  }
  
  return (
    <div>
      <input type="file" accept='image/*' multiple onChange={handleFileChange}/>
      {selected && <Waterfall data={vailImg(selected)} width={window.innerWidth} isRenderHeartIcon={false} /> }
      <div className="load" ref={ref}>
      </div>
    </div>
  )
}

export default UploadComponent