import React, { useState, useEffect } from "react";
import axios from 'axios'
import Waterfall from './Waterfall'


const UploadComponent = () => {
  const [ selected, setSelected ] = useState(null)
  //初始化
  
  useEffect(()=> {
    //從 local storage 獲取目前圖片訊息
    const storedImages = localStorage.getItem('uploadedImages')
    if(storedImages) {
      setSelected(JSON.parse(storedImages))
    } else {
      //如果 local storage 沒有數據則從 API 取得
      axios.get("http://localhost:5000/images")
        .then(response=> {
          setSelected(response.data)
          localStorage.setItem("uploadedImages", JSON.stringify(response.data));
          console.log("圖片訊息", response.data)
        })
        
        .catch(error => {
          console.error('Error fetching images', error)
        })
    }
  }, []) 
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

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
    </div>
  )
}

export default UploadComponent