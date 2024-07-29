import React, { useState, useEffect } from 'react'

const LocalImageUploader = () => {

  const [selected, setSelected] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  
  // 選取圖片時
  const handleFileChange = (e) => {
    const file = e.target.files;
    if (file) {
      setSelected(file);
    }
    // // FileReader API 讀取
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   previewURL(reader.result)
        // reader.readAsDataURL(file);
    // };
    // //  使用 Base64 將圖片編碼
    // 
    //使用 URL.createObjectURL 來獲取本地URL
    setPreviewURL(URL.createObjectURL(file))
    console.log(previewURL);
  }
  useEffect(()=>{
    localStorage.setItem('imageURL', JSON.stringify(previewURL))
  }, [previewURL])
  
  return (
    <div>
      <input type="file" accept='image/*' multiple onChange={handleFileChange}/>
      { previewURL && <img src={previewURL} alt='Preview' /> }
    </div>
  )
}

export default LocalImageUploader