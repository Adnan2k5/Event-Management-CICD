import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerHome() {
  const [customer, setCustomer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  const events = [
    { id: 1, name: "Music Fest 2025", image: "musicfest.jpeg" },
    { id: 2, name: "Tech Expo", image: "download.png" },
    { id: 3, name: "Cultural Carnival", image: "cultural.jpeg" },
    { id: 4, name: "Spring Boot Session", image: "spring.png" },
    { id: 5, name: "Hackathon", image: "hack.png" },
    { id: 6, name: "Dance Party", image: "dance.jpeg" },
    { id: 7, name: "Summer Camp", image: "summer.jpeg" },
    { id: 8, name: "10K walk", image: "walk.jpeg" },
  ];

  const handleBook = (eventId) => {
    navigate(`/viewallevents?eventid=${eventId}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ marginBottom: "10px" }}>Hello {customer.name}</h2>
      <h3 style={{ marginBottom: "20px" }}>Upcoming Events</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {events.map(event => (
          <div key={event.id} style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            width: "300px",
            padding: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            transition: "transform 0.2s",
          }}>
            <img
              src={event.image}
              alt={event.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <h4 style={{ marginTop: "10px", textAlign: "center" }}>{event.name}</h4>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
  onClick={() => handleBook(event.id)}
  style={{
    backgroundColor: "#007BFF", // Royal blue
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007BFF"}
>
  Book Now
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
