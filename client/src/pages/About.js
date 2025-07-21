import React from 'react';
import Layout from '../components/Layout/Layout'
import './StaticPages.css';

const About = () => {
  return (
    <Layout>
      <div className="static-page">
        <img
          src="https://media.istockphoto.com/id/1449490038/photo/online-shopping-and-e-commerce-technology-concept-shopper-using-computer-laptop-to-input.jpg?s=2048x2048&w=is&k=20&c=3Pmwqsxiy2XTePmajfBQyz2KcnC27QtzaFxNmBD9al0="
          alt="About E-Shop"
          className="static-image"
        />
        <h1>About Us</h1>
        <p>
          Welcome to E-Shop — your go-to destination for quality products at unbeatable prices. 
          We are committed to providing an exceptional shopping experience, fast delivery, and excellent customer service.
        </p>
      </div>
    </Layout>
  );
};

export default About;
