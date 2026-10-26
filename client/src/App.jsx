import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, createContext, useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from './axios/axios'

export const appData = createContext()


function App() {
  const [user, setUser] = useState("")
  const navigate = useNavigate()
  async function checkUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
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
      navigate("/login")

    }
  }
  useEffect(() => {
    checkUser()
  }, []);





  return (
    <appData.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </appData.Provider>
  )
}

export default App
