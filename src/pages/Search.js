import {useEffect, useRef} from 'react'

const Search = ({search, setInput, input}) => {
  // 用於引用搜尋欄
  const searchbarRef = useRef(null)
  // 使用 useRef 保留滾動位置
  let lastScrollTop= useRef(0)

  useEffect(()=>{
    const handleScroll = () => {
    const searchbar = searchbarRef.current
    if(!searchbar) return 

    const currentScroll = window.scrollY

  //滾動向下時隱藏導航欄
  if(currentScroll > lastScrollTop.current) {
    searchbar.style.transform = 'translateY(-100%)'
  } else {
    searchbar.style.transform = 'translateY(0%)'
  }
 // 更新滾動位置, 並防止負值
 lastScrollTop.current = currentScroll <= 0 ? 0: currentScroll
}

  //監聽滾動事件
  window.addEventListener('scroll', handleScroll)
  // 清除滾動事件監聽，每次滾動時都會執行 handleScroll 函數
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, [])

  return (
    <div 
    className='search' 
    ref={searchbarRef}  // 將 DOM 元素綁定到 useRef
    >
      <input className='input' onChange={(e)=> setInput(e.target.value)} type="text" value={input}/>
      <button onClick={search}>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>

      </button>
    </div>
  )
}

export default Search