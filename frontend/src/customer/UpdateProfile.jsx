import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setFormData(JSON.parse(storedCustomer));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/customer/updateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('customer', JSON.stringify(formData));
      }
    } catch (error) {
      setMessage('');
      setError(error.response ? error.response.data : "An unexpected error occurred.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '50px 20px',
      background: 'linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
      }}>
        <h3 style={{
          textAlign: "center",
          color: "#3a1c71",
          marginBottom: "25px",
          fontSize: "24px",
          fontWeight: "bold",
          textTransform: "uppercase"
        }}>Update Profile</h3>

        {message && <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{message}</p>}
        {error && <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { id: 'name', label: 'Full Name', type: 'text' },
            { id: 'dob', label: 'Date of Birth', type: 'date' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
            { id: 'mobileno', label: 'Mobile No', type: 'number' },
            { id: 'location', label: 'Location', type: 'text' }
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>{label}</label>
              <input
                id={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  backgroundColor: '#f9f9f9',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#d76d77'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>Gender</label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              disabled
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                color: '#555'
              }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>Username</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              disabled
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#e9e9e9',
                color: '#666'
              }}
            />
          </div>

          <button type="submit" style={{
            padding: '12px',
            background: 'linear-gradient(to right, #fc466b, #3f5efb)',
            border: 'none',
            borderRadius: '25px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
