import React from 'react'

const Picture = ({data}) => {
  return (
    <div class="picture">
      <p>{data.photographer}</p>
      <div class="imageContainer">
        <img src={data.src.large} alt={data.alt} />
      </div>
      <p>
        Download:
        <a target="_blank" href={data.src.large} rel="noreferrer">
          Click
        </a>
      </p>
    </div>
  );
}

export default Picture