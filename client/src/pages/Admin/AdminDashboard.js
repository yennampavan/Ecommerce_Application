import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-info-card">
          <h2>Admin Name: {auth?.user?.name}</h2>
          <p>Email: {auth?.user?.email}</p>
          <p>Phone: {auth?.user?.phone}</p>
          <p>Address: {auth?.user?.address}</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
