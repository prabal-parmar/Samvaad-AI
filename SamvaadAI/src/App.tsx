import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ThemeProvider } from './context/themeContext'
import { useEffect } from 'react'
import { getToken, removeToken } from './api/auth/axiosInterseptor'
import { jwtDecode } from 'jwt-decode'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if(!token) {
      return;
    }
    const decoded = jwtDecode(token);

    if(!decoded){
      removeToken();
      // Logout
      navigate("/login");
      return;
    }

    if(decoded.exp && decoded.exp < Date.now()/1000){
      removeToken();
      // Logout
      navigate("/login");
      return;
    }
  }, [])

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
