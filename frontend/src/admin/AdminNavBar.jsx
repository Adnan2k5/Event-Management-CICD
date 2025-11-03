import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AddManager from './AddManager';
import ViewManagers from './ViewManagers';
import ViewCustomers from './ViewCustomers';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';
import AddProduct from './AddProduct';
import DisplayProducts from './DisplayProducts';
import ViewAllProducts from './ViewAllProducts';

export default function AdminNavBar() 
{
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsAdminLoggedIn(false); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addeventmanager">Add Event Managers</Link></li>
          <li><Link to="/viewmanagers">View Event Managers</Link></li>
          <li><Link to="/viewallcustomers">View All Customers</Link></li>

          

          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addeventmanager" element={<AddManager />} exact />
        <Route path="/viewmanagers" element={<ViewManagers />} exact />
        <Route path="/viewallcustomers" element={<ViewCustomers />} exact />

        <Route path="/addproduct" element={<AddProduct/>} exact />
        <Route path="/viewallproducts" element={<ViewAllProducts/>} exact />
        <Route path="/displayproducts" element={<DisplayProducts/>} exact />

        <Route path="/adminlogin" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}