import { useState, useEffect } from "react"
import ColorPlatte from "./ColorPlatte"

const Tags = ({setTag}) => {
  const [color, setColor]=useState('')
  const [currentTag, setCurrentTag] = useState('')
  const tags = [
    "Nature", 'Cats', 'Ocean', 'Technology', 'Fashion'
  ]

  const handleTagClick = (tag, color) => {
    setTag(`${tag} ${color}`)
  }

  useEffect(()=>{
    handleTagClick(currentTag, color)
  }, [currentTag,color])

  const handleClearTags = ()=> {
    setTag('')
    setCurrentTag('')
    setColor('')
  }

  return (
    <div className="tag-container">
        {tags.map((tag)=> {
          return <button 
            onClick={()=>{
              handleTagClick(tag, color)
              setCurrentTag(tag)
              }} // 點擊標籤更新選中的標籤
            key={tag}
            className="tag-btn"
            >
              {tag}
            </button>
          })}
          <div className="color-platte-tag-container">
            Color Platte
            <div onClick={()=>handleTagClick(currentTag, color)} >
              <ColorPlatte 
              setSelectedColor={(color)=>setColor(color)}
              />
            </div>
          </div>
          <button onClick={handleClearTags}>
            X Clear
          </button>
    </div>
  )
}

export default Tags