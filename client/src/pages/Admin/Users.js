import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-info-card">
          <h1>Users</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Users
