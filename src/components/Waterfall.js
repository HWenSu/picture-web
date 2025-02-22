import React, { useState, useEffect } from 'react'
import Picture from "../components/Picture";

//分配瀑布流每一列的函式
const allocateItem = (data, cols, colWidth ) => {
  //儲存每列瀑布流的內容
  const arr = []
  //儲存每列瀑布流的高度
  const heightArr = []

  //初始化瀑布流的內容列表和高度列表
  for(let i=0; i<cols; i++){
    arr.push([])
    heightArr.push(0)
  }

  //獲取高度最小的流的 index
  function getIndexOfHightFlow() {
    let minH = Number.MAX_SAFE_INTEGER
    let minIndex = 0
    heightArr.forEach((h, index) => {
      if(h < minH){
        minH = h
        minIndex = index
      }
    })
    return minIndex
  }


  //透過計算展示高度, 設置瀑布流的內容列表
  data.forEach((item) => {
    const index = getIndexOfHightFlow()
    item.displayHeight = item.height * ( Math.floor(colWidth) / item.width)
    // console.log(colWidth, item.width, item.height)
    // console.log(item.displayHeight);
    arr[index].push(item)
    heightArr[index] += item.displayHeight
  })
  return arr
  }

  

const Waterfall = (props) => {
  const { data = [], margin = 40 } = props;
  const [width, setWidth] = useState(window.innerWidth) //視窗寬度
  // const defaultColWidth = (width - (cols - 1) * margin) / cols;  
  const [cols, setCols] = useState(4)
  const [colList, setColList] = useState([]);

  const recalculateLayout = () => {
    const currentWidth = window.innerWidth * 0.9 //視窗寬度的80%
    //依螢幕寬度判斷col值
    const newCols = currentWidth < 768? 2:4
    setCols(newCols)
    const colWidth = (currentWidth - ((newCols-1) * margin )) / newCols
    setColList(allocateItem(data, newCols, colWidth))
    setWidth(currentWidth) // 更新當前視窗寬度
  }

  //監聽視窗變化
  useEffect(() => {
    recalculateLayout() //初始化計算一次
    const handleResize = () => {
      recalculateLayout()
    }
    // 設置監聽器
    window.addEventListener("resize", handleResize)
    //清除監聽器
    return () => window.removeEventListener("resize", handleResize)
    
  },[data])

  return (
    <div className="waterfall" style={{ width: 90 + "%", margin: "auto" }}>
      {colList.map((col, fIndex) => (
        <ul
          className="waterfall-list"
          style={{
            width: (width - (cols -1) * margin) / cols + "px",
            display: "inline-block",
            margin: "10px",
          }}
          key={"flow_" + fIndex}
        >
          {col.map((item, iIndex) => (
            <li
              className="waterfall-item"
              key={item.id || iIndex}
              style={{
                marginBottom:" 1.7rem",
              }}
            >

              <Picture
                data={item}
                imgURL={item.src.large}
                height={item.displayHeight}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );

}

export default Waterfall