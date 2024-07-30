import React, { useState } from 'react'
import Waterfall from '../components/Waterfall'
import LocalImageUploader from '../components/LocalImageUploader';

const Portfolio = () => {
  
 const [selected, setSelected] = useState(null);

  return (
    <div>
      { selected && <Waterfall data={selected} width={window.innerWidth} />
      }
      <LocalImageUploader />
    </div>
  );
}

export default Portfolio