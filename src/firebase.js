// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiQQsKNVsF6qFKjXTDBdWytTvCeW2i_c8",
  authDomain: "picture-web-7f29f.firebaseapp.com",
  projectId: "picture-web-7f29f",
  storageBucket: "picture-web-7f29f.appspot.com",
  messagingSenderId: "425824655322",
  appId: "1:425824655322:web:24c8f98433c5db057a92e3",
  measurementId: "G-KQ0B26ZT1C"
};


// 初始化身份驗證
const app = initializeApp(firebaseConfig);
//導出
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

//測試寫入功能
const testFirestore = async () => {
  try {
    await setDoc(doc(db, "testCollection", "testDoc"), {
      name: "Test",
      timestamp: new Date()
    });
    console.log("Firestore 数据写入成功");
  } catch (error) {
    console.error("Firestore 数据写入失败:", error.message);
  }
};

testFirestore();