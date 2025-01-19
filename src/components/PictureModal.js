import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"

const PictureModal = ( { src, alt, photographer, photographer_url, url, handlePicture } ) => {
  const {user} = useAuth()
  const [isClosed, setIsClosed]=useState(false)

  const handleClose = ()=> {
    setIsClosed (true)
    handlePicture()
  }

  return (
    !isClosed? (
    <div className="picture-modal-container" onClick={handleClose}>
      <div className="picture-info-container">
      <button className="close-btn" onClick={handleClose}>X</button>
      <section className="picture-section">
        <img src={src} alt={alt} />
      </section>
      <section className="info-container">
        <div className="photographer">
          
          <p>{photographer.toUpperCase()}</p>
        </div>
        <button className="main-button">
          <a href={url} target="_blank">
          Visit Website
          </a>
        </button>
        <div>

        </div>
        
      </section>
      </div>
      <div className='black-blur-filter'></div>
    </div> ) : null
  )
}

export default PictureModal