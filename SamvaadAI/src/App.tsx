import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { useEffect } from 'react'
import { getToken, removeToken } from './api/auth/axiosInterseptor'
import { jwtDecode } from 'jwt-decode'
import GuestRoute from './props/GuesRoute'
import ProtectedRoute from './props/ProtectedRoute'
import Home from './pages/Home'
import { useTheme } from './context/themeContext'

function App() {
  const { setIsDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if(!token) {
      return;
    }
    const theme = localStorage.getItem("theme");
    if(theme=="dark"){
      setIsDark(true);
    }
    else{
      setIsDark(false);
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
      <Routes>
        <Route path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/login" 
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
          } />
          
        <Route path="/register" 
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
      </Routes>
  )
}

export default App
