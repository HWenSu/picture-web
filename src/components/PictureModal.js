import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import Collect from "./Collect"

const PictureModal = ( { data, src, alt, photographer, photographer_url, url, handlePicture, isFavorite, onFavoriteChange } ) => {
  const {user} = useAuth()
  const [isClosed, setIsClosed]=useState(false)
  console.log(data)
  const title = data.title

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
          <h2>{photographer?.toUpperCase()}</h2>
        </div>
        {photographer&&
        <div className='btn-container'>
          <Collect data={data} isFavorite={isFavorite} onFavoriteChange={onFavoriteChange} />
          <button className="main-button">
          <a href={url} target="_blank" rel="noreferrer">
          Visit Website
          </a>
          </button>
        </div>
        }
        {title&&
        <div>
          {console.log(data)}
          <h2>{title}</h2>
          <h3>{data.category}</h3>
          <p>{data.description}</p>
        </div>
        }

        
      </section>
      </div>
      <div className='black-blur-filter'></div>
    </div> ) : null
  )
}

export default PictureModal