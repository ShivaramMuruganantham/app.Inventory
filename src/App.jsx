import ReactDom from 'react-dom'
import { Route, Routes, BrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'

import Onboarding from './pages/Onboarding'
import AdminLogin from './pages/AdminLogin'
import UserLogin from './pages/UserLogin'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="mx-auto max-w-[500px] min-h-screen shadow">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
