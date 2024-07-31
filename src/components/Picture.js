import React from 'react'

const Picture = ({ data, imgURL, height }) => {
  return (
    <div className="picture">
      <div className="imageContainer" style={{ height: height + "px" }}>
        <img src={imgURL} alt={data.alt || "Image"} />
        <a target="_blank" href={imgURL} rel="noreferrer"></a>
      </div>
      <p className="photographer">{data.photographer}</p>
    </div>
  );
};

export default Picture