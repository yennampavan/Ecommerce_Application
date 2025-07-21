import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className="admin-menu-wrapper">
      <div className="admin-menu-card">
        <h3 className="admin-menu-title">User Menu</h3>
        <hr />
        <ul className="admin-menu-links">
          <li>
            <NavLink to="/dashboard/user/profile">
              👤 Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/orders">
              📦 Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu
