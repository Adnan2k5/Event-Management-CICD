import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    manager: '',
    company: '',
    category: '',
    title: '',
    description: '',
    capacity: '',
    cost: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${config.url}/customer/viewallevents`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleBookClick = (eventId) => {
    const customer = JSON.parse(sessionStorage.getItem("customer"));
    if (!customer || !customer.id) {
      alert("Customer not logged in");
      return;
    }
    navigate(`/bookevent?eventid=${eventId}`);
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredEvents = events.filter(event => {
    return (
      event.id.toString().includes(searchTerms.id) &&
      event.manager.name.toLowerCase().includes(searchTerms.manager.toLowerCase()) &&
      event.manager.company_name.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      event.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      event.title.toLowerCase().includes(searchTerms.title.toLowerCase()) &&
      event.description.toLowerCase().includes(searchTerms.description.toLowerCase()) &&
      event.capacity.toString().includes(searchTerms.capacity) &&
      event.cost.toString().includes(searchTerms.cost)
    );
  });

  return (
    <div style={{
      padding: "40px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(to right, #f7f8fc, #e6ecf5)",
      minHeight: "100vh"
    }}>
      <h3 style={{
        textAlign: "center",
        color: "#2c3e50",
        fontWeight: "800",
        fontSize: "30px",
        marginBottom: "30px",
        letterSpacing: "1px"
      }}>
        <u>Available Events</u>
      </h3>

      <div style={{
        overflowX: "auto",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        padding: "20px"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "1000px"
        }}>
          <thead>
            <tr style={{
              background: "linear-gradient(to right, #8e44ad, #3498db)",
              color: "#fff",
              textTransform: "uppercase",
              fontSize: "14px"
            }}>
              {["ID", "Company", "Location", "Category", "Title", "Description", "Capacity", "Cost", "Action"].map((head, index) => (
                <th key={index} style={{
                  padding: "16px",
                  fontWeight: "600",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd"
                }}>{head}</th>
              ))}
            </tr>
            <tr>
              {["id", "company", "manager", "category", "title", "description", "capacity", "cost"].map((field, index) => (
                <th key={index} style={{ padding: "8px" }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => handleSearchChange(e, field)}
                    style={{
                      padding: "6px 10px",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ccc"
                    }}
                  />
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr key={event.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    transition: "background 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e6f2ff"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff"}
                >
                  <td style={{ padding: "14px" }}>{event.id}</td>
                  <td style={{ padding: "14px" }}>{event.manager.company_name}</td>
                  <td style={{ padding: "14px" }}>{event.manager.company_location}</td>
                  <td style={{ padding: "14px" }}>{event.category}</td>
                  <td style={{ padding: "14px" }}>{event.title}</td>
                  <td style={{ padding: "14px" }}>{event.description}</td>
                  <td style={{ padding: "14px" }}>{event.capacity}</td>
                  <td style={{ padding: "14px" }}>{event.cost}</td>
                  <td style={{ padding: "14px" }}>
                    <button
                      onClick={() => handleBookClick(event.id)}
                      style={{
                        backgroundColor: "#27ae60",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        fontWeight: "500"
                      }}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#e74c3c",
                  fontWeight: "600"
                }}>
                  No matching events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
