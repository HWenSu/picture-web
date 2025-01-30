import React from 'react'

const ColorPlatte = ({setSelectedColor}) => {
  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Green", hex: "#008000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Gray", hex: "#808080" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Teal", hex: "#008080" },
  ]; 

  return (
    <div className='color-platte-container'>
      { colors.map((color)=>{
        return <div 
          className='color-btn'
          key={color.hex}
          onClick={()=>setSelectedColor(color.name)}
          style={{backgroundColor:`${color.hex}`}}
          >
        </div>
      })

      }
    </div>
  )
}

export default ColorPlatte