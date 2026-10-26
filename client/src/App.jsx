import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, createContext, useState } from 'react'
import Home from './pages/Home'
import axios from './axios/axios'
import Landingpage from './pages/Landingpage'

export const appData = createContext()


function App() {
  const [user, setUser] = useState("")
  const navigate = useNavigate()
  async function checkUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {

      const { data } = await axios.get('/users/check', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setUser(data)
    } catch (error) {
      navigate("/")

    }
  }
  useEffect(() => {
    checkUser()
  }, []);





  return (
    <appData.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Landingpage />} />
        <Route path="/register" element={<Landingpage />} />
      </Routes>
    </appData.Provider>
  )
}

export default App
