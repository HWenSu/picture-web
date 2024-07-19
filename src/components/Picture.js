import React from 'react'

const Picture = ({data, height}) => {
  return (
    <div className="picture">
      <div className="imageContainer" style={{ height: height + "px" }} >
        <img
          src={data.src.large}
          alt={data.alt}
        />
           <a target="_blank" href={data.src.large} rel="noreferrer">
           </a>
      </div>
      <p className='photographer'>{data.photographer}</p>
    </div>
  );
}

export default Picture