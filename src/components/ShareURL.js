import {useState} from 'react'

const ShareURL = () => {
  const [onClicked, setOnClicked]=useState(false)

  const handleClick = ()=> {
    setOnClicked(true)
  }

  return (
    <div className='common-icon' onClick={handleClick} >
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
         <path fill-rule="evenodd" d="M14.516 6.743c-.41-.368-.443-1-.077-1.41a.99.99 0 0 1 1.405-.078l5.487 4.948.007.006A2.047 2.047 0 0 1 22 11.721a2.06 2.06 0 0 1-.662 1.51l-5.584 5.09a.99.99 0 0 1-1.404-.07 1.003 1.003 0 0 1 .068-1.412l5.578-5.082a.05.05 0 0 0 .015-.036.051.051 0 0 0-.015-.036l-5.48-4.942Zm-6.543 9.199v-.42a4.168 4.168 0 0 0-2.715 2.415c-.154.382-.44.695-.806.88a1.683 1.683 0 0 1-2.167-.571 1.705 1.705 0 0 1-.279-1.092V15.88c0-3.77 2.526-7.039 5.967-7.573V7.57a1.957 1.957 0 0 1 .993-1.838 1.931 1.931 0 0 1 2.153.184l5.08 4.248a.646.646 0 0 1 .012.011l.011.01a2.098 2.098 0 0 1 .703 1.57 2.108 2.108 0 0 1-.726 1.59l-5.08 4.25a1.933 1.933 0 0 1-2.929-.614 1.957 1.957 0 0 1-.217-1.04Z" clip-rule="evenodd"/>
      </svg>

      {/* 彈出窗 */}
      { onClicked&&
      <div className='share-modal-container'>
        <button className=''>
          
          <p>複製連結</p>
        </button>

        <button className=''>
        
          <p>Line</p>
        </button>

        <button className=''>
          <image src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="Instagram"/>
          <p>Instagram</p>
        </button>

        <button className=''>
       
          <p>Facebook</p>
        </button>

        <button className=''>
       
          <p>X</p>
        </button>
      </div>
      }
    </div>
  )
}

export default ShareURL