import { useState, useEffect } from 'react';

export default function ManagerProfile() {
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      setManager(JSON.parse(storedManager));
    }
  }, []);

  if (!manager) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #8e44ad, #3498db)",
        color: "#fff",
        fontSize: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #8e44ad, #3498db)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          width: "400px",
        }}
      >
        <h2 style={{
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "30px",
          color: "#2c3e50"
        }}>
          Manager Profile
        </h2>

        <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#555" }}>
          <p><strong>Name:</strong> {manager.name}</p>
          <p><strong>Gender:</strong> {manager.gender}</p>
          <p><strong>Date of Birth:</strong> {manager.dob}</p>
          <p><strong>Email:</strong> {manager.email}</p>
          <p><strong>Username:</strong> {manager.username}</p>
          <p><strong>Mobile No:</strong> {manager.mobileno}</p>
          <p><strong>Company Name:</strong> {manager.company_name}</p>
          <p><strong>Company Location:</strong> {manager.company_location}</p>
        </div>
      </div>
    </div>
  );
}
