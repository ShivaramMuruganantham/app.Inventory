import ReactDom from 'react-dom'
import { Route, Routes, BrowserRouter, RouterProvider, useLocation } from 'react-router-dom'

import './App.css'

import Onboarding from './pages/Onboarding'
import AdminLogin from './pages/AdminLogin'
import UserLogin from './pages/UserLogin'
import Dashboard from './pages/Dashboard'
import Analysis from './pages/Analysis'
import Shop from './pages/Shop'

import Footer from './components/footer'

function AppRoutes() {
  const location = useLocation();
  const hideFooter = ['/','/admin-login', '/user-login'];
  const showFooter = !hideFooter.includes(location.pathname);

  return (
    <div className="mx-auto max-w-[500px] min-h-screen shadow">
        {showFooter && <Footer />}
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/products" element={<Shop />} />
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
