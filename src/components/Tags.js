import {useState} from 'react'

const Tags = ({setTag, setInput}) => {
  const tags = [
    "Nature", 'Cats', 'Ocean', 'Technology', 'Fashion'
  ]



  return (
    <div>
        {tags.map((tag)=> {
          return <button 
            onClick={()=>setTag(tag)} // 點擊標籤更新選中的標籤
            key={tag}>
              {tag}
            </button>
          })}
    </div>
  )
}

export default Tags