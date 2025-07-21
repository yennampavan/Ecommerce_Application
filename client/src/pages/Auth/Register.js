import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.css';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer:''
  });
  const [auth,setAuth]=useAuth();
    useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth?.user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, formData);
      if (res.data?.success) {
        toast.success(res.data.message || 'Registered successfully!');
        navigate('/login')
      } else {
        toast.error(res.data.message || 'Registration failed!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <Layout>
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="tel"
          name="answer"
          placeholder="What is your favorite sport"
          value={formData.answer}
          onChange={handleChange}
          required
        />
        <p className="register-redirect-text">
  Already have an account?{" "}
  <span 
    onClick={() => navigate('/login')} 
    className="register-redirect-link"
  >
    Login
  </span>
</p>

        <button type="submit">Register</button>
      </form>
    </div>
    </Layout>
  );
};

export default Register;
