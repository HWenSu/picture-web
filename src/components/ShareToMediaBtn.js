import {useState} from 'react'

const ShareToMediaBtn = ({imgURL, alt, MediaUrl }) => {
  const [isCopied, setIscopied] = useState(false)
  const currentURL = encodeURIComponent(window.location.href)
  const openURL = MediaUrl + currentURL
  
  const handleShareToMedia = () => {
    window.open(openURL, "_blank");
    setIscopied(true)
    setTimeout(()=>{setIscopied(false)}, 3000)
  }

  return (
    <button onClick={handleShareToMedia}>
      <img src={imgURL} alt={alt}/>
      <p>{!isCopied? alt: 'Copied'}</p>
    </button>
  )
}

export default ShareToMediaBtn