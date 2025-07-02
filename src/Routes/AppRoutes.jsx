import ReactDom from 'react-dom'
import { Route, Routes, BrowserRouter, RouterProvider, useLocation } from 'react-router-dom'

import '../Routes/AppRoutes.css'

import Onboarding from '../pages/Onboarding'
import ShopRegister from '../pages/ShopRegister'
import AdminRegister from '../pages/AdminRegister'
import UserLogin from '../pages/UserLogin'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Analysis from '../pages/Analysis'
import Shop from '../pages/Shop'
import Revenue from '../pages/Revenue'

import Footer from '../components/footer'

function AppRoutes() {
  const location = useLocation();
  const hideFooter = ['/', '/shop-register', '/admin-register', '/user-login', '/register', '/revenue'];
  const showFooter = !hideFooter.includes(location.pathname);

  return (
    <div className="mx-auto max-w-[500px] min-h-screen shadow">
        {showFooter && <Footer />}
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/shop-register" element={<ShopRegister />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/revenue" element={<Revenue />} />
        </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
