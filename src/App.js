import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Info from "./Info";
import Create from "./Create";

function App() {
  let [myName, setMyName] = useState('a')
  const buttonHandler = ()=> {
    setMyName('b')
  }

  useEffect(()=>{
    console.log('on it')
  }, [myName])
  return (
    <div>
      <h1>{myName}</h1>
      <button onClick={buttonHandler} >Change name</button>
    </div>
  );
}

export default App;
