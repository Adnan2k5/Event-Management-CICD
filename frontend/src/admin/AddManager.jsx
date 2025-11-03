import { useState } from 'react';
import axios from 'axios';
import config from '../config'

export default function AddManager() 
{
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username:'',
    password: '',
    mobileno: '',
    company_name: '',
    company_location: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => 
  {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleCase = (e) => 
    {
      setFormData({...formData, [e.target.id]: e.target.value.toUpperCase()});
    };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    try
    {
        const response = await axios.post(`${config.url}/admin/addeventmanager`, formData);
        if (response.status === 200) // if succcessfully added
        {
            setMessage(response.data);
            setFormData({
              name: '',
              gender: '',
              dob: '',
              email: '',
              username:'',
              password: '',
              mobileno: '',
              location: '',
              company_name: '',
              company_location: ''
            });
        }
    } 
    catch (error) 
    {
      if(error.response) 
      {
        setMessage("")
        setError(error.response.data);
      }
      else 
      {
        setMessage("")
        setError("An unexpected error occurred.");
      }
    }

  };
  
  return (
    <div>
      <h3 style={{ textAlign: "center",textDecoration: "underline"}}>Add Event Manager</h3>
      {
            message?
            <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{message}</p>:
            <p style={{textAlign: "center",color:"red",fontWeight:"bolder"}}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} onKeyUp={handleCase} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No</label>
          <input type="number" id="mobileno" value={formData.mobileno} onChange={handleChange} required />
        </div>
        <div>
          <label>Company Name</label>
          <input type="text" id="company_name" value={formData.company_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Company Location</label>
          <input type="text" id="company_location" value={formData.company_location} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}