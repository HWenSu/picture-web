import React, { useState, useEffect } from 'react'
import Waterfall from './Waterfall'

const LocalImageUploader = () => {

  const [selected, setSelected] = useState(null)
  const [previewArr, setPreviewArr] = useState([])
  
  // 選取圖片時
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const data = [];

    files.forEach((file) => {
      //生成圖片URL
      const url = URL.createObjectURL(file)
      
      // 建立 Image來取得圖片尺寸
        const image = new Image()
        image.src = url
        image.onload = function() {
          const width = image.width
          const height = image.height
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
    })
  }

 useEffect(() => {
   // 為每個文件創建預覽 URL
   if(selected) {
    //讀取現有的URL
    const existingData = JSON.parse(localStorage.getItem("previewData")) || [];
    //將新的URL新增到現有的URL陣列中
    const updateData = [...existingData, ...selected];
    //儲存至Local storage
    localStorage.setItem("previewData", JSON.stringify(updateData));
    //更新預覽資料
    setPreviewArr(updateData)
   }
 }, [selected]);


//  localStorage.clear();

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      {/* <div class="previewContainer">
        {selected &&
          selected.map((file, index) => {
            return (
              <div class="imageContainer" key={index}>
                <img src={file.src.large} alt="preview" />
              </div>
            );
          })}
      </div> */}
      {previewArr && <Waterfall data={previewArr} width={window.innerWidth} />}
    </div>
  );
}

export default LocalImageUploader