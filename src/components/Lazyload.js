import React from 'react'
import Waterfall from './Waterfall';
import { InView, useInView } from 'react-intersection-observer';

const Lazyload = (props) => {
  // const { item } = item
 
  const {ref, inView} = useInView({
    triggerOnce: true,
    root: document.querySelector('.scroll-container'),
    rootMargin: `0px 0px ${window.innerHeight}px 0px`,
    onChange: (inView, entry) => {
        console.log('info', inView, entry.intersectionRatio,inv );
    }
  })
  
  return (
    <div ref={ref}>
      {InView ? (
      <Waterfall />  
      ) : null}
    </div>
  )
}

export default Lazyload