import  {createContext, useContext, useEffect, useSate, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';

//創建Context
const AuthContext = createContext()

//提供者組件
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    //監聽登入狀態
    useEffect(()=> {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
          console.log("用戶登入", user)
          setUser(user)
        } else {
          console.log("用戶未登入", user)
        }
      })
      return ()=> unsubscribe() // 清除監聽器
    }, [])
    
    return (
      <AuthContext.Provider value={{ user }}>
        {children}
      </AuthContext.Provider>
  )
}

//自定義Hook
export const useAuth = () => {
  return useContext(AuthContext)
}
