import React, { useState, useEffect } from 'react'
import Picture from "../components/Picture";




//分配瀑布流每一列的函式
const allocateItem = (data, cols, colWidth) => {
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
    item.displayHeight = ( item.height * colWidth ) / item.width
    arr[index].push(item)
    heightArr[index] += item.displayHeight
  })
  return arr
  }




const Waterfall = (props) => {
  const { data=[],cols=1, width, margin=40 } = props;
  const defaultColWidth = (width - (cols - 1) * margin) / cols;  
  const [colList, setColList] = useState(
     allocateItem(data, cols, defaultColWidth)
   );

  useEffect(() => {
    setColList(allocateItem(data, cols, defaultColWidth));
  },[data, cols, defaultColWidth])


  
  return (
    <div className="waterfall" style={{ width: 100 + "%", margin: "auto" }}>
      {colList.map((col, fIndex) => (
        <ul
          className="waterfall-list"
          style={{
            width: defaultColWidth + "px",
            display: "inline-block",
            margin: "1vw",
          }}
          key={"flow_" + fIndex}
        >
          {col.map((item, iIndex) => (
            <li
              className="waterfall-item"
              key={iIndex}
              style={{
                // height: item.displayHeight + "px",
                marginBottom: margin,
              }}
            >
              {/* <div className="pictures"> */}
                <Picture data={item} height={item.displayHeight-5} />

              {/* </div> */}
            </li>
          ))}
        </ul>
      ))}
      
    </div>
  );


}

export default Waterfall