import { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: false
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [id]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.captcha) {
      setError("Please verify the CAPTCHA.");
      return;
    }

    try {
      const response = await axios.post(`${config.url}/admin/checkadminlogin`, {
        username: formData.username,
        password: formData.password
      });

      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        navigate("/adminhome");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="admin-login-container">
      <h3 className="admin-title">Admin Login</h3>
      
      {message ? (
        <p className="admin-message success">{message}</p>
      ) : (
        <p className="admin-message error">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="dummy-captcha">
          <p>Please check the box below</p>
          <div className="checkbox-line">
            <input
              type="checkbox"
              id="captcha"
              checked={formData.captcha}
              onChange={handleChange}
              required
            />
            <label htmlFor="captcha">I’m not a robot</label>
            <div className="captcha-logo">🤖</div>
          </div>
        </div>

        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}
