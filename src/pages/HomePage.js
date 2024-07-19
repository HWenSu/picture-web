import React, { useState, useEffect } from "react";
import Search from "./Search";
import Picture from "../components/Picture";
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
    setCurrentSearch(input)
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
  }, [])

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      {
        /* <div className="pictures" gap={10} cols={3}>
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div> */
        <div>
          <div>
            {data && (
              <Waterfall
                data={data}
                cols={4}
                width={window.innerWidth}
              />
            )}
          </div>
        </div>
      }
     
      <div className="morePicture">
        <button onClick={morePicture}>More Pictures</button>
      </div>
      <div className='load' ref={ref}>
        {/* {InView ? (
      <Waterfall />  
      ) : null} */}
      </div>
    </div>
  );
};

export default HomePage;
