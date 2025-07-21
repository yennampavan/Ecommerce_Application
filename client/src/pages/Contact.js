import React from 'react';
import Layout from '../components/Layout/Layout'
import './StaticPages.css';

const Contact = () => {
  return (
    <Layout>
      <div className="static-page">
        <img
          src="https://media.istockphoto.com/id/1015358064/photo/website-contact-us-concept-with-wooden-blocks.jpg?s=2048x2048&w=is&k=20&c=SP-Z4Zv_lk21hCGPTCDu9P7ORsT0fX9qCTRc6uhJsM0="
          alt="Contact Us"
          className="static-image"
        />
        <h1>Contact Us</h1>
        <p>
          Have questions or need help? Reach out to us anytime.
        </p>
        <ul className="contact-details">
          <li>Email: support@eshop.com</li>
          <li>Phone: +91-9876543210</li>
          <li>Address: Hyderabad, Telangana, India</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Contact;
