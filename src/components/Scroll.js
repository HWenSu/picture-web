import React, { useEffect } from 'react'
import {throttle, debounce} from 'lodash'


const Scroll = () => {
  const handleScroll = () => {
    console.log('Scroll')
  } 

  const throttleScrollHandler = throttle(handleScroll, 200)
  const debounceScrollHandler = debounce(handleScroll, 200)
  
  useEffect(()=> {
    window.addEventListener('scroll', throttleScrollHandler)
    return ()=>{
      window.removeEventListener('scroll', throttleScrollHandler)
    }
  },[])

  return (
    <div style={{overflowY: 'scroll' }} >
      
    </div>
  )
}

export default Scroll