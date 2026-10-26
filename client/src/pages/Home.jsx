import { useContext } from "react"
import { appData } from "../App.jsx"
function Home() {
  const { user } = useContext(appData)

  return (
    <div>
      <h2>Home</h2>
      <h1>welcome{user.username}</h1>

    </div>
  )
}

export default Home
