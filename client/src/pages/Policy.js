import React from 'react';
import Layout from '../components/Layout/Layout'
import './StaticPages.css';

const Policy = () => {
  return (
    <Layout>
      <div className="static-page">
        <img
          src="https://cdn.pixabay.com/photo/2019/09/30/15/59/security-4516171_1280.jpg"
          alt="Privacy Policy"
          className="static-image"
        />
        <h1>Privacy & Policy</h1>
        <p>
          We value your privacy. All your personal data is securely stored and never shared with third parties.
          Learn more about our practices and how we protect your information.
        </p>
      </div>
    </Layout>
  );
};

export default Policy;
