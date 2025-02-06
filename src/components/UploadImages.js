import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Waterfall from "./Waterfall";
import { useAuth } from '../context/AuthContext'

const UploadImages = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState("Graphic");
  const [showUploadImg, setShowUploadImg] = useState(false)
  const categoryList = ["Art", "Graphic", "Fashion", "Creative Coding", "Logo"];
  const [hideUploadBtn, setHideUploadBtn] = useState(false)
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const fileInputRef = useRef(null)
  const { user, loading } = useAuth();

  // 初始化 API 獲取圖片
  useEffect(() => {
    if (loading) return; // 等待會員驗證完成
    const fetchImages = async () => {
      try {
        const token = user ? await user.getIdToken() : null;
        const userId = user ? user.uid : null;
        const response = await axios.get(`${baseURL}/images`, {
          params: { userId },
          headers: token ? { "Authorization": `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setSelected(response.data.data);
      } 
      catch (error) {
      }
    };
    fetchImages();
  }, [baseURL, user, loading]);
  


  // 處理文件選擇
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length === 0) return;
    setFile(filesArray[0]); // 只存單一檔案
  };
  
  const handleUpload = async () => {
    if (!user) {
      alert("請先登入才能上傳圖片！");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    const tagArr = tags.split(",").map((tag) => tag.trim());
    tagArr.forEach((tag) => formData.append("tags", tag));
  
    try {
      const token = await user.getIdToken(); // 取得 Firebase Auth Token
      const response = await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`, // 確保傳入正確的 JWT
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true // 允許帶上 Cookie 或 Token

      });
      
      // 更新圖片列表
      const formattedData = response.data;
      setSelected((prev) => [...prev, formattedData]);
  
      // 清空輸入欄位
      setFile(null);
      setTitle("");
      setTags("");
      setCategory("Graphic");
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  // Lazy Load: 載入更多圖片
  const morePictures = async () => {
    if (isLoading) return;
    const nextPage = page + 1;
    const newURL = `${baseURL}/images?page=${nextPage}&limit=15`;

    setIsLoading(true);
    try {
      const result = await axios.get(newURL);
      const newImgs = result.data.data;
      if (newImgs.length > 0) {
        setSelected((prev) => [...prev, ...newImgs]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching more pictures:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 監聽 InView
  const { ref, inView } = useInView({
    triggerOnce: false,
    root: null,
    rootMargin: `0px 0px ${window.innerHeight}px 0px`,
  });

  useEffect(() => {
    if (inView) {
      morePictures();
    }
  }, [inView]);

  // 過濾有效圖片
  const validImages = selected.filter((img) => img?.src?.large);

  return (
    <div>
      {user&&
      <section>
        {!hideUploadBtn&&
          <button onClick={()=> setShowUploadImg(!showUploadImg)} >Upload Image</button>}
        <button onClick={()=> setHideUploadBtn(!hideUploadBtn) } >{ hideUploadBtn? "Back to edit":"Preview Mode"}</button>
      </section>
      }
      {showUploadImg&&
      <section className="upload-image-modal">
        <div className="upload-image-container">
        <div className="file-container">
          <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
          {/* 預覽圖片 */}
          {file&&
          <div className="preImg-container">
            <img src={URL.createObjectURL(file)} alt="Preview Images"  />
          </div>
          }
        </div>
        <div className="info-edit-container">
          <label>
            Title
           <input type="text" placeholder="Artwork title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Description
            <textarea type="text" placeholder="Say something..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          {/* <label>
            Tags
            <input type="text" placeholder="color, type, tools..." value={tags} onChange={(e) => setTags(e.target.value)} />
          </label> */}
          <label>
            Category
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              {categoryList.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          
          
        </div>
        </div>
      <button onClick={handleUpload}>Upload File</button>
      </section>
      }
      {/* 瀑布流顯示圖片 */}
      {validImages.length > 0 && <Waterfall data={validImages} width={window.innerWidth} />}
    </div>
  );
};

export default UploadImages;
