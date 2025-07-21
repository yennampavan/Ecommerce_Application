import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout>
        <div className="admin-dashboard-container">
        <div className="admin-sidebar">
            <UserMenu />
        </div>
        <div className="admin-info-card">
            <h1>Orders</h1>
        </div>
        </div>
    </Layout>
  )
}

export default Orders
