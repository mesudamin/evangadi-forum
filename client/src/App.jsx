import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, createContext, useState } from 'react'
import Home from './pages/Home'
import axios from './axios/axios'
import Landingpage from './pages/Landingpage'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import Answer from './pages/Answer/Answer'

export const appData = createContext()


function App() {
  const [user, setUser] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  async function checkUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      if (location.pathname.toLowerCase() === '/home') {
        navigate("/");
      }
      return;
    }
    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setUser(data)
      if (
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/register'
      ) {
        navigate("/Home");
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
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
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:questionid" element={<Answer />} />
        <Route path="/questions/:questionid" element={<Answer />} />
        <Route path="/answer/:questionid" element={<Answer />} />
      </Routes>
    </appData.Provider>
  )
}

export default App
