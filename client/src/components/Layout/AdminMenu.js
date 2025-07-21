import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminMenu.css';

const AdminMenu = () => {
  return (
    <div className="admin-menu-wrapper">
      <div className="admin-menu-card">
        <h3 className="admin-menu-title">Admin Panel</h3>
        <hr />
        <ul className="admin-menu-links">
          <li>
            <NavLink to="/dashboard/admin/create-category">
              📂 Create Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-product">
              🛒 Create Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/products">
              🛍️ Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/users">
              👥 Users
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
