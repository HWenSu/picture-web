import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import Collect from "./Collect"

const PictureModal = ( { data, src, alt, photographer, photographer_url, url, handlePicture, isFavorite, onFavoriteChange } ) => {
  const {user} = useAuth()
  const [isClosed, setIsClosed]=useState(false)

  const handleClose = ()=> {
    setIsClosed (true)
    handlePicture()
  }

  return (
    !isClosed? (
    <div className="picture-modal-container">
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
          <Collect isFavorite={isFavorite} onFavoriteChange={onFavoriteChange} />
        </div>
        
      </section>
      </div>
      <div className='black-blur-filter'></div>
    </div> ) : null
  )
}

export default PictureModal