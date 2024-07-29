import React, { useState, useEffect } from 'react'

const LocalImageUploader = () => {

  const [selected, setSelected] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const validFiles = []
  
  // 選取圖片時
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      validFiles.push(file)
    })
    setSelected(validFiles);
  }

 useEffect(() => {
   // 為每個文件創建預覽 URL
   if(selected) {
   const urls = selected.map((file) => URL.createObjectURL(file));
   setPreviewURL(urls);
   localStorage.setItem('imageURLs', JSON.stringify(urls))
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
          const previewURL = URL.createObjectURL(file);
          
          return (
            <div class="imageContainer">
              <img src={previewURL} alt="preview" />
              {}
            </div>
          );
        })}
      </div>
    </div>
  );


}

export default LocalImageUploader