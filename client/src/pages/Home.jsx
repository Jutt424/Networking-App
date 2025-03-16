import React from 'react'
import LandingPage from '../components/shared/LandingPage'
import Dashboard from './Dashboard'
import AdminPanel from './AdminPanel'
import AdminDashboard from './Dashboard/AdminDashboard'


const Home = () => {
  return (
    <div className="min-h-screen">
        <LandingPage />
        {/* <AdminDashboard /> */}
        <Dashboard />
        <AdminPanel />
    </div>
  )
}

export default Home
