import {useState} from 'react'
import PictureModal from './PictureModal';

const Picture = ({ data, imgURL, height }) => {

  const [isPictureModal, setIsPictureModal] = useState(false)
  
  const handlePicture = ()=> {
    setIsPictureModal(!isPictureModal)
  }

  return (
    <div className="picture">
      <div className='picture-btn' onClick={handlePicture}>
      <div className="imageContainer" style={{ height: height + "px" }}>
        <img src={imgURL} alt={data.alt || "Image"} />
        <a target="_blank" href={imgURL} rel="noreferrer"></a>
      </div>
      <p className="photographer">{data.photographer}</p>
      </div>
      {/* 是否打開圖片彈出窗 */}
      {isPictureModal&& 
      <PictureModal 
      src={imgURL} 
      alt={data.alt || "Image"}  
      photographer={data.photographer}
      url={data.url}
      photographer_url={data.photographer_url}
      handlePicture={handlePicture}
      />}
    </div>
  )
};

export default Picture