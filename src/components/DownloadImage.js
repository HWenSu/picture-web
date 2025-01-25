import React from 'react'

const DownloadImage = ({imgURL, fileName}) => {
  const handleDownloadImg = async () => {
    try {
      // 使用 fetch 獲取圖片
      const response = await fetch(imgURL, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('圖片下載失敗，請檢查圖片 URL');
      }

      // 將圖片轉換為 Blob
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      // 創建虛擬 <a> 標籤
      const link = document.createElement('a');
      link.href = blobURL;

      // 如果 fileName 未傳遞，設置默認檔案名
      link.download = fileName ? `${fileName}.jpeg` : 'default-image.jpeg';

      // 模擬點擊觸發下載
      link.click();

      // 釋放 Blob URL 資源
      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error('下載圖片失敗：', error);
      alert('下載失敗，請檢查圖片 URL 或網絡連接');
    }
  };


  return (
    <div onClick={handleDownloadImg} className='common-icon'>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
      </svg>
    </div>
  )
}

export default DownloadImage