import { useState } from 'react';
import './manager.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { useAuth } from '../contextapi/AuthContext';

export default function ManagerLogin() 
{
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();
  const {setIsManagerLoggedIn} = useAuth();


  const handleChange = (e) => 
  {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
  
    try 
    {
      const response = await axios.post(`${config.url}/manager/checkmanagerlogin`, formData);
  
      if(response.status === 200) 
      {
        setIsManagerLoggedIn(true);
        sessionStorage.setItem('manager', JSON.stringify(response.data));
        navigate("/managerhome");
      }
      else
      {
         setMessage(response.data)
      }
    } 
    catch (error) 
    {
      if(error.response) 
      {
        setError(error.response.data);
      }
      else 
      {
        setError("An unexpected error occurred.");
      }
    }
  }
  

  return (
    <div>
      <h3 style={{ textAlign: "center",textDecoration: "underline"}}>Manager Login</h3>
      {
            message?
            <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{message}</p>:
            <p style={{textAlign: "center",color:"red",fontWeight:"bolder"}}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}