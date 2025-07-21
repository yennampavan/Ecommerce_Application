import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate  } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../SearchInput';
import axios from 'axios';


const cartCount = 3; 

const Header = () => {
  const navigate=useNavigate();
  const [auth,setAuth]=useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    const { data } = await axios.get('/api/v1/category/get-category');
    setCategories(data?.category || []);
  };
  fetchCategories();
}, []);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const handleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })

    localStorage.removeItem('auth');
    closeMenu();
    toast.success('Logout successful!');
    navigate('/login')
    
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">E-Shop</Link>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon">&#9776;</span>
          </button>

          <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
            <div className="navbar-center">
              <SearchInput />
            </div>

            <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            {/* <li><NavLink to="/categories" onClick={closeMenu}>Categories</NavLink></li>
            <ul className="dropdown-menu">
            <li><NavLink to="/categories" onClick={closeMenu}>All Categories</NavLink></li>
            {categories.map((c) => (
              <li key={c._id}>
                <NavLink to={`/category/${c.slug}`} onClick={closeMenu}>
                  {c.name}
                </NavLink>
              </li>
            ))}
          </ul> */}
          <li className="nav-item dropdown">
            <Link to={'/category'} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
            </Link>
            <ul className="dropdown-menu">
              {categories.map((c) => (
              <li key={c._id}>
                <NavLink className="dropdown-item" to={`/category/${c.slug}`} onClick={closeMenu}>
                  {c.name}
                </NavLink>
              </li>
            ))}
            </ul>
          </li>

            {
              !auth.user ? (
                <>
                <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
            <li><NavLink to="/register" onClick={closeMenu}>Register</NavLink></li>
                </>
              ) : (
                <>
                {/* <li><span  onClick={handleLogout}>Logout</span></li> */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <i className="fas fa-user-circle"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" onClick={closeMenu}>Dashboard</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                  </ul>
                </li>



                </>
              )
            }
            
            <li>
              <NavLink to="/cart" className="cart-icon" onClick={closeMenu}>
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
