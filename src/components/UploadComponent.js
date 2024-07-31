import React, { useState, useEffect } from "react";
import axios from 'axios'
import Waterfall from './Waterfall'


const UploadComponent = () => {
  const [ selected, setSelected ] = useState(null)
  
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
      const formattedData = response.data.map((item) => ({
        displayHeight: item.displayHeight,
        height: item.height,
        src: {
          large: item.url,
        },
        width: item.width,
      }));
      setSelected(formattedData);
      
    })
    .catch(error => {
      console.error('Error uploading files:', error)
    })
  }

  // useEffect(()=>{
  //   if(selected) {
  //     //讀取現有Data
  //     const existingData = JSON.parse(localStorage.getItem('previewData')) || []
  //     //加入新的Data
  //     const updateData = {...existingData, ...selected}
  //     //存入local storage 
  //     localStorage.setItem('previewData', JSON.stringify(updateData))
  //   }
  // },[selected])
  console.log(selected);
  return (
    <div>
      <input type="file" accept='image/*' multiple onChange={handleFileChange}/>
      { selected && <Waterfall data={selected} width={window.innerWidth} /> }
    </div>
  )
}

export default UploadComponent