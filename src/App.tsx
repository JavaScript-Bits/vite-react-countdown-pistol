import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/auth/Login'
import { NavBar } from './components/layout/NavBar'
import { Register } from './pages/auth/Register'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
