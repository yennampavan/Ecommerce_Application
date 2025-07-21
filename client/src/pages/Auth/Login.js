import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import './Login.css';
import { useAuth } from '../../context/auth';

const Login = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', formData);
      if (res.data?.success) {
        toast.success('Login successful!');
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
        // Optionally store token/user
        // localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state ||'/');
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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

          <div className="forgot-password-link" onClick={() => navigate('/forgotPassword')}>
  Forgot Password?
</div>
          <p className="login-redirect-text">Don't have an account?{" "}
          <span onClick={() => navigate('/register')} 
            className="login-redirect-link">Register</span>
        </p>
        

          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
