import React, { useState, useEffect } from "react";
import Search from "./Search";
import axios from "axios";
import "wc-waterfall";
import Waterfall from "../components/Waterfall";
import { InView, useInView } from 'react-intersection-observer';


const HomePage = () => {
  let [data, setData] = useState([]);
  let [input, setInput] = useState('')
  let [page, setPage] = useState(1)
  let [currentSearch, setCurrentSearch] = useState('')
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
    let newURL
    setPage(page+1)
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  }
    //Lazy Load
    const {ref, inView} = useInView({
      triggerOnce: false,
      root: null,
      rootMargin: `0px 0px ${window.innerHeight}px 0px`,
      onChange: (inView, entry) => {
          console.log('info', inView, entry.intersectionRatio);
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

 console.log(data)

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
                // cols={4}
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
