import React, { useState, useEffect } from 'react'

const LocalImageUploader = () => {

  const [selected, setSelected] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  
  
  // 選取圖片時
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const data = [];

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        const image = new Image()
        image.src = event.target.result // 用 FileReader 讀取的 URL
        image.onload = function() {
          const width = image.width
          const height = image.height
          const url = image.src
          //用物件封裝
          const imageData = {
            'width': width,
            'height': height,
            "src": {
              "large": url,
            }
          };
        data.push(imageData)
        // 確保所有文件都處理完 再更新狀態
        if (data.length === files.length) {
          setSelected(data)
        }
        }
      }
      reader.readAsDataURL(file) // 預覽圖片
    })
  }

 useEffect(() => {
   // 為每個文件創建預覽 URL
   if(selected) {
    //讀取現有的URL
    const existingURLs = JSON.parse(localStorage.getItem("imageURLs")) || [];
    //將新的URL新增到現有的URL陣列中
    const newURLs = selected.map((file) => file.src.large);
    const updateURLs = [...existingURLs, ...newURLs];
    //儲存至Local storage
    localStorage.setItem('imageURLs', JSON.stringify(updateURLs))
   }
 }, [selected]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <div class="previewContainer">
        {selected && selected.map((file, index) => {
          return (
            <div class="imageContainer" key={index}>
              <img src={file.src.large} alt="preview" />
            </div>
          );
        })}
      </div>
    </div>
  );


}

export default LocalImageUploader