import React, {useState} from 'react'
import './styles/style.css'

const Info = ({msg, setMsg}) => {
  return (
    <div className="info">
      {
        msg.map((m, index)=> (
          <p key={index}>learn:{m}</p>
        ))
      }
    </div>
  );
}

export default Info