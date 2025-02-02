import {useEffect, useRef} from 'react'
import gsap from 'gsap'

const Cursor = ({hoverState}) => {
  const cursorRef = useRef(null)

  useEffect(()=>{
    const cursor = cursorRef.current
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    window.addEventListener('mousemove', moveCursor )

    return ()=> window.removeEventListener('mousemove', moveCursor )
  }, [hoverState])

  useEffect(() => {
    const cursor = cursorRef.current;
    
    if (hoverState) {
      gsap.to(cursor, {
        width:'3rem',
        height:'3rem',
        backgroundColor: "#fff",
        duration: 0.3,
        top:'5px',
        left:'5px',
      });
    } else {
      gsap.to(cursor, {
        width:'0.5rem',
        height:'0.5rem',
        backgroundColor: "#000",
        duration: 0.3,
      });
    }
  }, [hoverState]);

  return (
    <div className="paint-container">
     <div ref={cursorRef} className='cursor' >
      {hoverState? <p>Click</p>:null}
     </div>
    </div>
  )
}

export default Cursor