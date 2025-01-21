import {Children, createContext, useContext, useEffect, useState} from 'react'
import { useAuth } from './AuthContext'
import { getDocs } from 'firebase/firestore'


const FavoriteContext = createContext() 

export const FavoriteProvider = ({Children})=>{
  const {user} = useAuth()
  const [Favorites, setFavorites]=useState([])

  //獲取收藏狀態
  // useEffect(()=> {
  //   const loadFavorites = async () => {
  //     if(!user) return 
  //     try{
  //       const querySnapshot = await getDocs()
  //     }
  //   }
  // })
}

export default FavoriteContext