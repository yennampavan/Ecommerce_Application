import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'

const Profile = () => {
  return (
    <Layout>
        <div className="admin-dashboard-container">
        <div className="admin-sidebar">
            <UserMenu />
        </div>
        <div className="admin-info-card">
            <h1>Profile</h1>
        </div>
        </div>
    </Layout>
  )
}

export default Profile
