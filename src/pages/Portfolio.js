import React from 'react'
import Waterfall from '../components/Waterfall'

const dataArr = localStorage.getItem('imageURLs')

const Portfolio = () => {
  return (
    <div>
      {dataArr && <Waterfall data={dataArr} width={window.innerWidth} />
      }
    </div>
  );
}

export default Portfolio