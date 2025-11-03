import { Routes, Route, Link } from 'react-router-dom';
import './customer.css';
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import CustomerLogin from './CustomerLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import BookedEvents from './BookedEvents';
import ViewAllEvents from './ViewAllEvents';
import BookEvent from './BookEvent';

export default function CustomerNavBar() 
{
  const { setIsCustomerLoggedIn } = useAuth(); 

  const handleLogout = () => 
 {
    setIsCustomerLoggedIn(false);
    sessionStorage.clear()
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Customer</div>
        <ul className="nav-links">
          <li><Link to="/customerhome">Home</Link></li>
          <li><Link to="/customerprofile">Customer Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/viewallevents">Book a New Event</Link></li>
          <li><Link to="/bookedevents">Booked Events</Link></li>
          <li><Link to="/customerlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/customerhome" element={<CustomerHome />} exact />
        <Route path="/customerprofile" element={<CustomerProfile />} exact />
        <Route path="/updateprofile" element={<UpdateProfile/>} exact />
        <Route path="/updateprofile" element={<UpdateProfile/>} exact />
        <Route path="/viewallevents" element={<ViewAllEvents/>} exact />
        <Route path="/bookevent" element={<BookEvent/>} />
        <Route path="/bookedevents" element={<BookedEvents/>} exact />
        <Route path="/customerlogin" element={<CustomerLogin />} exact />
      </Routes>
    </div>
  );
}