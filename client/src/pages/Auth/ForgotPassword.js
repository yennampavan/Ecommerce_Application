import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    answer:''
  });
  const [auth,setAuth]=useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/forgetpassword', formData);
      if (res.data?.success) {
        toast.success('Login successful!');
        // Optionally store token/user
        // localStorage.setItem("auth", JSON.stringify(res.data));
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Reset failed! Try again');
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
          <h2>Reset Password</h2>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="answer"
            placeholder="What is your Favourite sport"
            value={formData.answer}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

        

          <button type="submit">Reset</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword;
