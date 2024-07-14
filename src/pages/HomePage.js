import React, { useState, useEffect } from "react";
import Search from "./Search";
import Picture from "../components/Picture";
import axios from "axios";

const HomePage = () => {
  let [data, setData] = useState(null);
  let [input, setInput] = useState('')
  const auth = "IoVLB7zwZCxDGHkKwaEbO8saubpAcanF1RZzk69ehS7aKLc2JsD4P10P";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_[age=15&page=1]`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
  };
  
  useEffect(() => {
    search(initialURL);
  }, [])

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search search={()=>{
        search(searchURL)
      }} setInput={setInput}/>
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />
          })}
      </div>
    </div>
  );
};

export default HomePage;
