import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagenotfound.css';
import Layout from '../components/Layout/Layout';

const Pagenotfound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-message">Sorry, the page you're looking for doesn't exist.</p>
        <button className="notfound-button" onClick={() => navigate('/')}>
          🔙 Go to Homepage
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default Pagenotfound;
