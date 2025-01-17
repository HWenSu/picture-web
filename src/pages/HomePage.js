import React, { useState, useEffect } from "react";
import Search from "./Search";
import axios from "axios";
import "wc-waterfall";
import Waterfall from "../components/Waterfall";
import { InView, useInView } from 'react-intersection-observer';
import { set } from "lodash";


const HomePage = () => {
  let [data, setData] = useState([]);
  let [input, setInput] = useState('')
  let [page, setPage] = useState(1)
  let [currentSearch, setCurrentSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const auth = "IoVLB7zwZCxDGHkKwaEbO8saubpAcanF1RZzk69ehS7aKLc2JsD4P10P";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  
//取得Search API
  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
  };

  const morePicture = async() => {
    if(isLoading) return
    setIsLoading(true)
    
    let newPage = page +1
    let newURL
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${newPage}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        newPage
      }`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setPage(newPage)
    setData((preData)=> {
      const allData = [...preData, ...result.data.photos]
      //去除重複資料
      const filtedData = Array.from(
        //用Array Set方式過濾掉重複id, 再從過濾完的id尋找該圖片資料
        new Set(allData.map((item)=> item.id))).map((id)=> allData.find((item)=> item.id === id))
        return filtedData
      }
      )
    setIsLoading(false)
  }
    //Lazy Load
    const {ref, inView} = useInView({
      triggerOnce: false,
      root: null,
      rootMargin: `0px 0px ${window.innerHeight}px 0px`,
      onChange: (inView, entry) => {
          if (inView) {
            morePicture();
          }
      }
    })  

      useEffect(() => {
        search(initialURL);
      }, []);

 const imgURL = () => {
   return data ? data.map((item) => item.src.large) : [];
 };


  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          if (input.trim() !== "") {
            search(searchURL);
            setCurrentSearch(input);
          }
        }}
        setInput={setInput}
      />
      {

        <div>
          <div>
            {data && (
              <Waterfall
                imgURL={imgURL()}
                data={data}
                width={window.innerWidth}
              />
            )}
          </div>
        </div>
      }

      <div className="load" ref={ref}>
      </div>
    </div>
  );
};

export default HomePage;
