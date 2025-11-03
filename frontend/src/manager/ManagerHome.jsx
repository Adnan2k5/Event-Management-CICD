import { useState, useEffect } from 'react';

export default function ManagerHome() {
  const [manager, setManager] = useState("");

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      setManager(JSON.parse(storedManager));
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #8e44ad, #3498db)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "40px 60px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        textAlign: "center",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h2 style={{
          color: "#2c3e50",
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "10px"
        }}>
          Welcome Back,
        </h2>
        <h3 style={{
          color: "#2980b9",
          fontSize: "26px",
          fontWeight: "600",
          marginBottom: "20px"
        }}>
          {manager.name}
        </h3>
        <p style={{
          fontSize: "16px",
          color: "#555",
          lineHeight: "1.6"
        }}>
          You can now view and manage all your events from the dashboard.
        </p>
      </div>
    </div>
  );
}
