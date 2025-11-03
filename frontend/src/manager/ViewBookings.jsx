import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [managerId, setManagerId] = useState(null);

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      const manager = JSON.parse(storedManager);
      setManagerId(manager.id);
      fetchBookings(manager.id);
    } else {
      setError('Manager not logged in.');
    }
  }, []);

  const fetchBookings = async (managerId) => {
    try {
      const response = await axios.get(`${config.url}/manager/viewbookingsbymanager/${managerId}`);
      setBookings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings');
      setBookings([]);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await axios.get(`${config.url}/manager/updatebookingstatus`, {
        params: {
          id: bookingId,
          status: status
        }
      });
      alert(response.data);
      fetchBookings(managerId); // Refresh the bookings list
    } catch (err) {
      alert('Failed to update booking status');
      console.error(err);
    }
  };
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Bookings for My Events</h3>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No bookings available for your events.</p>
      ) : (
        <table style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Booking ID</th>
              <th>Event ID</th>
              <th>Event Title</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Booked Capacity</th>
              <th>Status</th>
              <th>Booking Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.id}</td>
                <td>{booking.event.id}</td>
                <td>{booking.event.title}</td>
                <td>{booking.customer.name}</td>
                <td>{booking.customer.email}</td>
                <td>{booking.startdate}</td>
                <td>{booking.enddate}</td>
                <td>{booking.bookedcapacity}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.bookingtime).toLocaleString()}</td>
                <td>
                      <button
                        onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                        style={{ marginRight: '5px', backgroundColor: 'green', color: 'white' }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'REJECTED')}
                        style={{ backgroundColor: 'red', color: 'white' }}
                      >
                        Reject
                      </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}