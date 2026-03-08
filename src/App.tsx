import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Admin from './pages/Admin'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="produtos" element={<Products />} />
        <Route path="sobre" element={<About />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
