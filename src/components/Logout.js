import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

const Logout = ({onClose}) => {
  
  const navigate = useNavigate()
  const handleLogOut = async () => {
    try {
      await signOut(auth)
      navigate('/')
      onClose()
      window.location.reload() //重新整理
    }
    catch(error) {
      console.error("登出失敗:", error.message)
    }
  }

  return (
    <div>
      <button onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  )
}

export default Logout