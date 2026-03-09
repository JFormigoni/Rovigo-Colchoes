import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Products from './pages/Products'
import About from './pages/About'
import Admin from './pages/Admin'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Landing Page como rota principal */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rotas públicas com Layout (Navbar padrão) */}
        <Route element={<Layout />}>
          <Route path="/produtos" element={<Products />} />
          <Route path="/sobre" element={<About />} />
        </Route>
        
        {/* Rotas administrativas com AdminLayout separado */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
