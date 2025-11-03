import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './style.css';
import CustomerLogin from './../customer/CustomerLogin';
import CustomerRegistration from './../customer/CustomerRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import ManagerLogin from '../manager/ManagerLogin';
import NotFound from './NotFound';

export default function MainNavBar() 
{
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Event Management System</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/customerregistration">Register</Link></li>
          <li className="dropdown">
            <span>Login ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/customerlogin">Customer</Link></li>
              <li><Link to="/managerlogin">Manager</Link></li>
              <li><Link to="/adminlogin">Admin</Link></li>
            </ul>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/customerregistration" element={<CustomerRegistration />} exact />
        <Route path="/customerlogin" element={<CustomerLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/managerlogin" element={<ManagerLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}