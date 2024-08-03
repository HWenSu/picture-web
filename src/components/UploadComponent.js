import React, { useState, useEffect } from "react";
import axios from 'axios'
import Waterfall from './Waterfall'
import { InView, useInView } from 'react-intersection-observer';


const UploadComponent = () => {
  const [ selected, setSelected ] = useState([])
  const [ page, setPage ] = useState(1)
  
  //初始化
  useEffect(()=> {
    //從 local storage 獲取目前圖片訊息
    const storedImages = localStorage.getItem('uploadedImages')
    if(storedImages) {
      setSelected(JSON.parse(storedImages))
    } else {
      //如果 local storage 沒有數據則從 API 取得
      axios.get(`http://localhost:5000/images?page=${page}&limit=15`)
        .then(response=> {
          setSelected(response.data.data)
          localStorage.setItem("uploadedImages", JSON.stringify(response.data.data));
          console.log("圖片訊息", response.data)
        })
        
        .catch(error => {
          console.error('Error fetching images', error)
        })
    }
  }, []) 

  const morePictures = async() => {
    let newURL
    setPage (page +1)
    newURL = `http://localhost:5000/images?page=${page}&limit=15`
    let result = await axios.get(newURL)
    setSelected(result.data)
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

    axios.post("http://localhost:5000/upload", formData)
    .then(response => {
      //重新定義資料格式 匹配pixels API 格式來使用相同PICTURE組件
      const formattedData = response.data
      const updateImages = [...selected, ...formattedData]
      setSelected(updateImages)
      //更新 local storage
       localStorage.setItem("uploadedImages", JSON.stringify(updateImages));
      
    })
    .catch(error => {
      console.error('Error uploading files:', error)
    })
  }
  // localStorage.clear()
  console.log(selected);
  return (
    <div>
      <input type="file" accept='image/*' multiple onChange={handleFileChange}/>
      { selected && <Waterfall data={selected} width={window.innerWidth} /> }
      <div className="load" ref={ref}>
      </div>
    </div>
  )
}

export default UploadComponent