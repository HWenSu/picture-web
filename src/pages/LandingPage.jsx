import { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import Cursor from './Cursor'

const LandingPage = () => {
  const containerRef = useRef(null)
  const placeholderRef = useRef(null)
  const subheaderRef = useRef(null)
  const itemsRef = useRef([])
  const [hoverState, setHoverState] = useState(false)
  const [alertAnimation, setAlertAnimation] = useState(false)

  const defaultSubHeaderText = 'Together, we create Tomorrow.'
  const defaultText = 'ELVA'

  // const [animationFinished, setAnimationFinished] = useState(false)
  const navigate = useNavigate()



   // 文字拆分並加入模糊效果
  const wrapLetters = (text) => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    placeholder.innerHTML = "";
    [...text].forEach((letter) => {
      const span = document.createElement("span");
      span.style.filter = "blur(8px)";
      span.textContent = letter || " "; // 確保每個 span 至少有一個空格
      placeholder.appendChild(span);
    });
  };

  // 依序移除模糊效果
  const animateBlurEffect = () => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    const letters = placeholder.children;
    let index = 0

    const clearNextLetter = () => {
      if (index < letters.length) {
        gsap.to(letters[index], { filter: "blur(0px)", duration: 0.5 });
        index++;
        setTimeout(clearNextLetter, 100)
      }
    }
    setTimeout(clearNextLetter, 100)
  }

  // GSAP 縮放動畫
  const animateScale = (element, scaleValue) => {
    gsap.fromTo(element, { scale: 1 }, { scale: scaleValue, duration: 2, ease: "power1.out" });
  };

  useEffect(()=>{
    let timeoutId = null;
    let intervalHandles = [];
    const subHeaders = [
      'Gather sparks, ignite creativity.',
      'Showcasing visions, capturing brilliance.',
      'Cherish moments, keep inspiration.',
      'Unlock possibilities, step inside.'
    ]
    const gsapTextTarget = [
      placeholderRef.current, ...itemsRef.current, subheaderRef.current
    ]
    const currentItemsRef = itemsRef.current

      //顏色動畫設定
    const changeColors = ()=> {
      gsap.to(containerRef.current, {backgroundColor:"#000", duration: 0.5})
      gsap.to(gsapTextTarget , {color:"#fff", duration: 0.5})
    }

    const revertColors = () => {
      gsap.to(containerRef.current, {backgroundColor:"#e3e3e3", duration: 0.5})
      gsap.to(gsapTextTarget , {color:"#000", duration: 0.5})
    }
    // 文字隨機變換動畫
    const shuffleLetters = (finalText) => {
      wrapLetters("");
      wrapLetters(finalText.replace(/./g, " "));

      const placeholder = placeholderRef.current;
      if (!placeholder || !placeholder.children.length) return;

      let textArray = finalText.split("");
      let shufflingCounter = 0;
      let intervalHandles = [];

      const shuffle = (index) => {
        if(!placeholder.children[index]) return
        if (shufflingCounter < 30) {
          textArray[index] =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
          placeholder.children[index].textContent = textArray[index];
        } else {
          placeholder.children[index].textContent = finalText.charAt(index);
          clearInterval(intervalHandles[index]);
        }
      };

      for (let i = 0; i < finalText.length; i++) {
        intervalHandles[i] = setInterval(() => shuffle(i), 80);
      }

      setTimeout(() => {
        shufflingCounter = 30;
        for (let i = 0; i < finalText.length; i++) {
          if(!placeholder.children[i]) return
          placeholder.children[i].textContent = finalText.charAt(i);
          clearInterval(intervalHandles[i]);
        }
        animateBlurEffect();
      }, 1000);
    };

    // 更新文字內容
    const updatePlaceholderText = (event) => {
      const newText = event.target.textContent.toUpperCase();
      const itemIndex = itemsRef.current.indexOf(event.target);
      const newSubHeaderText = subHeaders[itemIndex]?.toUpperCase() || defaultSubHeaderText; 
  
      if (subheaderRef.current) {
        subheaderRef.current.textContent = newSubHeaderText;
      }
      timeoutId = setTimeout(() => shuffleLetters(newText), 50);
      changeColors()
      setHoverState(true)
    };

    // 重置 Placeholder 文字
    const resetPlaceholderText = () => {
      if (!placeholderRef.current) return; // 確保 `placeholderRef` 存在
      if (subheaderRef.current) {
        subheaderRef.current.textContent = defaultSubHeaderText;
      } else return

      wrapLetters(defaultText); // 先確保 `span` 存在
      animateScale(placeholderRef.current, 1.25);
      setTimeout(() => {placeholderRef.current.children.length&& shuffleLetters(defaultText)}, 50); // 延遲以確保 `span` 存在
      revertColors()
      setHoverState(false)

    };    
    //綁定事件
    currentItemsRef.forEach((el) => {
      if(el) {
        el.addEventListener('mouseenter', updatePlaceholderText)
        el.addEventListener('mouseleave', resetPlaceholderText)
      }
    })
    //清除事件
    return () => {
      clearTimeout(timeoutId);
      intervalHandles.forEach((handle) => clearInterval(handle));
      currentItemsRef.forEach((el)=> {
        if(el){
          el.removeEventListener('mouseenter', updatePlaceholderText)
          el.removeEventListener('mouseleave', resetPlaceholderText )
        }
      })
    }
   }, [])

   useEffect(()=>{
    const timeout = setTimeout(() => {
      setAlertAnimation(true);

       // 5 秒後隱藏動畫
       const hideTimeout = setTimeout(() => {
        setAlertAnimation(false);
      }, 5000);

      // 確保卸載時清除隱藏動畫的 Timeout
      return () => clearTimeout(hideTimeout);

    }, 3000);

    // 清除 Timeout，避免組件卸載後仍執行
    return () => clearTimeout(timeout);
   }, [])

  return (
    <div className='Landing-page-container' ref={containerRef}>
      <Cursor hoverState={hoverState}/>
      <nav>
        <div ref={(el)=>(itemsRef.current[0]=el)} onClick={()=> navigate('/picture-web')} >ideas</div>
        <div ref={(el)=>(itemsRef.current[1]=el)} onClick={()=> navigate('/picture-web/favorite')}>favorite</div>
      </nav>
      <footer>
        <div ref={(el)=>(itemsRef.current[2]=el)}>portfolio</div>
        <div ref={(el)=>(itemsRef.current[3]=el)}>sing in</div>
      </footer>
      <div className="header">
        <div className="placeholder" ref={placeholderRef}>ELVA</div>
        <p className="subheader" ref={subheaderRef}>Together, we create Tomorrow.</p>
        {alertAnimation?
          <p className='alert-animation'> Click one page from side</p> : null
        }
      </div>
    </div>
  )
}

export default LandingPage