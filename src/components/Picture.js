import React from 'react'

const Picture = ({data, height}) => {
  return (
    <div className="picture">
      {/* <p>{data.photographer}</p> */}
      <div className="imageContainer" style={{ height: height + "px" }} >
        <img
          src={data.src.large}
          alt={data.alt}
          
        />
      </div>
      {/* <p>
        <a target="_blank" href={data.src.large} rel="noreferrer">
          Download
        </a>
      </p> */}
    </div>
  );
}

export default Picture