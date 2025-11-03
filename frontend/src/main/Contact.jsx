import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    email: '',
    mobileno: '',
    location: ''
  });

  // message state variable
  const [message, setMessage] = useState('');
  // error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/sendemail`, formData);
      setMessage(response.data);
      setError('');
      
      // Clear form fields after successful submission
      setFormData({
        name: '',
        subject: '',
        message: '',
        email: '',
        mobileno: '',
        location: ''
      });
    } catch (err) {
      // Handle error response
      setError('Failed to send email');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Contact Us</h3>
      {message ? (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bolder' }}>{message}</p>
      ) : (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <input
            type="text"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="number"
            id="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}