import { useState, useEffect, useRef } from "react"
import ColorPlatte from "./ColorPlatte"

const Tags = ({setTag}) => {
  const colorRef = useRef(null)
  const [color, setColor] = useState('')
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
          <div className="color-platte-tag-container" ref={colorRef}>
            Color Platte
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
            </svg>
            <div onClick={()=>handleTagClick(currentTag, color)} >
                <ColorPlatte 
                setSelectedColor={(color)=>setColor(color)}
              />
            </div>
          </div>
          <button onClick={handleClearTags} className="dark-btn">
            X Reset
          </button>
    </div>
  )
}

export default Tags