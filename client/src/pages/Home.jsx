import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { appData } from "../App.jsx"

function Home() {
  const { user } = useContext(appData)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div>
      <h2>Home</h2>
      <h1>welcome {user?.username}</h1>
    </div>
  )
}

export default Home
