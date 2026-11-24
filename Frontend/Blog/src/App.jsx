import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './Pages/register'
import Login from './Pages/login'
import Home from './Pages/Home'
import Addblog from './Pages/Addblog'
import Dashboard from './Pages/Dashboard'
import EditBlog from './Pages/EditBlog'
import ViewBlog from './Pages/viewblog'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/addblog" element={<ProtectedRoute><Addblog/></ProtectedRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/editblog/:id" element={<ProtectedRoute><EditBlog/></ProtectedRoute>}/>
      <Route path="/viewblog" element={<ProtectedRoute><ViewBlog/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
