import React, {useState} from 'react'

const Create = ({msg, setMsg}) => {
  let  [input, setInput] = useState('')
 

  const submitButtonHandler = (e) => {
    e.preventDefault()
    setMsg([...msg, input])
    setInput('')
  }

  const inputHandler = (e) => {
    setInput(e.target.value)
  }

  return (
    <form>
      <input  onChange={inputHandler} type="text" value={input}/>
      <button onClick={submitButtonHandler} >Submit</button>
    </form>
  )
} 

export default Create