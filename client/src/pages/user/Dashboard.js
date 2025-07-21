import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <UserMenu />
        </div>
        <div className="admin-info-card">
          <h2>User Name: {auth?.user?.name}</h2>
          <p>Email: {auth?.user?.email}</p>
          <p>Phone: {auth?.user?.phone}</p>
          <p>Address: {auth?.user?.address}</p>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
