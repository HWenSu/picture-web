# 瀑布流圖片網站
![專案封面圖](https://github.com/HWenSu/picture-web/blob/main/HomePage.gif)
>瀑布流圖片網站是一個基於 React 的項目，旨在展示以瀑布流佈局 + 無限下滑的方式呈現的圖片。主頁可以有搜尋功能，作品集網頁提供上傳本地圖片並可新增到瀑布流佈局中。

**網站預覽** : https://picture-web.vercel.app

**後端repo** : https://github.com/HWenSu/picture-web-server


## 功能特色

- **瀑布流佈局**：以瀑布流形式展示圖片，提供良好的視覺體驗。
- **圖片懶加載**：在使用者滾動頁面時按需加載圖片，提升頁面加載性能。
- **響應式設計**: 支援不同裝置瀏覽介面。
- **響應式設計**：適配不同尺寸的螢幕，確保在各種設備上都有良好的顯示效果。

## 技術架構

### 前端技術

- **前端框架**：React
- **樣式**：SCSS
- **建置工具**：Create React App

### 後端技術

- **Node.js (Express.js)**：處理 API 請求。

### 其他工具

- **react-intersection-observer**：用於偵測 DOM 元素是否進入或離開可視範圍，適合實現懶加載功能。

### 搜尋功能畫面
![搜尋功能](https://github.com/HWenSu/picture-web/blob/main/Search.gif)

### 上傳圖片畫面
![上傳功能](https://github.com/HWenSu/picture-web/blob/main/Upload.gif)

## 安裝步驟

### 系統需求

- **Node.js**：版本 >= 16.0.0
- **npm 或 yarn**：包管理器

### 取得專案

**1. Clone專案至本地**

   ```bash
   git clone https://github.com/HWenSu/picture-web.git
   cd picture-web
   ```

**2. 安裝相依套件**
確保您已安裝 Node.js（建議使用最新的 LTS 版本）。然後執行以下命令：
   ```bash
   npm install
   ```


**3. 啟動開發伺服器**

   ```bash
   npm start
   ```

   預設伺服器地址：`http://localhost:3000`


##  開發筆記

1. **瀑布流的分配邏輯 **：
   - 功能：計算圖片分配到每列的邏輯，根據每列的高度動態分配。
   - 邏輯：
        1. 初始化兩個陣列：
        -- arr：儲存每列的內容。
        -- heightArr：記錄每列總高度。
        2. 遍歷資料 (data)：
        -- 計算每張圖片在當前列寬下的顯示高度 displayHeight。
        -- 找出最矮的列（getIndexOfHightFlow 函數）。
        -- 將圖片分配到該列，並更新對應列的高度。
        -- 輸出：分配後的圖片列數據（二维陣列）。


##  授權條款

此專案基於 MIT 許可證，詳細內容請參閱 [LICENSE](./LICENSE)。


## 聯絡方式

如有任何疑問或建議，請聯繫：

- **作者**：HWenSu
- **Email**：[trista44488@gmail.com](mailto:trista44488@gmail.com)
- **GitHub**：[HWenSu](https://github.com/HWenSu)

