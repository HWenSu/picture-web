import {useState, useEffect} from 'react'
import ShareToMediaBtn from './ShareToMediaBtn'

const ShareURL = () => {
  const [onClicked, setOnClicked]=useState(false)
  const [isCopied, setIscopied]=useState(false)

  // 彈出窗使用時觸發調整
  useEffect(() => {
    if (onClicked) {
      const modal = document.querySelector('.share-modal-container');
      if (modal) {
        adjustModalPosition(modal);
      }
    }
  }, [onClicked]);

  const handleClick = ()=> {
    setOnClicked(!onClicked)
  }

  //彈出窗動態對齊
  function adjustModalPosition(modal) {
    const rect = modal.getBoundingClientRect();
    const windowWidth = window.innerWidth;
  
    if (rect.right > windowWidth) {
      // 如果右邊超出視窗，調整位置
      modal.style.left = 'auto';
      modal.style.right = '10px'; // 靠右對齊，並保留內邊距
    } else if (rect.left < windowWidth){
      modal.style.left = '10px'
      modal.style.right = 'auto'
    }
    else {
      // 如果沒有超出，保持居中
      modal.style.left = '50%';
      modal.style.right = 'auto';
      modal.style.transform = 'translate(-50%, 0)';
    }
  }

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link)
      .then(() => {
        setIscopied(true)
        setTimeout(()=>setIscopied(false), 3000)
        })
      .catch(err => console.error("複製失敗", err));
  };
  

  return (
    <div>
    <div className='share-btn common-icon' onClick={handleClick} >
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
         <path fillRule="evenodd" d="M14.516 6.743c-.41-.368-.443-1-.077-1.41a.99.99 0 0 1 1.405-.078l5.487 4.948.007.006A2.047 2.047 0 0 1 22 11.721a2.06 2.06 0 0 1-.662 1.51l-5.584 5.09a.99.99 0 0 1-1.404-.07 1.003 1.003 0 0 1 .068-1.412l5.578-5.082a.05.05 0 0 0 .015-.036.051.051 0 0 0-.015-.036l-5.48-4.942Zm-6.543 9.199v-.42a4.168 4.168 0 0 0-2.715 2.415c-.154.382-.44.695-.806.88a1.683 1.683 0 0 1-2.167-.571 1.705 1.705 0 0 1-.279-1.092V15.88c0-3.77 2.526-7.039 5.967-7.573V7.57a1.957 1.957 0 0 1 .993-1.838 1.931 1.931 0 0 1 2.153.184l5.08 4.248a.646.646 0 0 1 .012.011l.011.01a2.098 2.098 0 0 1 .703 1.57 2.108 2.108 0 0 1-.726 1.59l-5.08 4.25a1.933 1.933 0 0 1-2.929-.614 1.957 1.957 0 0 1-.217-1.04Z" clipRule="evenodd"/>
      </svg>
      </div>
      {/* 彈出窗 */}
      { onClicked&&
      <>
      <div className='share-modal-bg' onClick={handleClick}></div>
      <div className='share-modal-container'>
        <button onClick={copyLink}>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
          </svg>
          <p>
          {!isCopied? "Link": "Copied"}
          </p>
        </button>

        <ShareToMediaBtn 
        imgURL={"https://img.icons8.com/?size=100&id=21746&format=png&color=000000"}
        alt={"Line"}
        MediaUrl={'https://social-plugins.line.me/lineit/share?url='}
        />

        <ShareToMediaBtn 
        imgURL={"https://img.icons8.com/?size=100&id=13912&format=png&color=000000"}
        alt={"Facebook"}
        MediaUrl={'https://www.facebook.com/sharer/sharer.php?u='}
        />

        <ShareToMediaBtn 
        imgURL={"https://img.icons8.com/?size=100&id=01GWmP9aUoPj&format=png&color=000000"}
        alt={"X"}
        MediaUrl={'https://twitter.com/intent/tweet?url='}
        />  

        <ShareToMediaBtn 
        imgURL={"https://img.icons8.com/?size=100&id=16713&format=png&color=000000"}
        alt={"WhatsApp"}
        MediaUrl={'https://api.whatsapp.com/send?text='}
        /> 
    
      </div>
      </>
    }
  </div>
  )
}

export default ShareURL