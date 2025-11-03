import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AdminHome() {
  const [customerCount, setCustomerCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const customerRes = await axios.get(`${config.url}/admin/customercount`);
        const managerRes = await axios.get(`${config.url}/admin/managercount`);
        const eventRes = await axios.get(`${config.url}/admin/eventcount`);

        setCustomerCount(customerRes.data);
        setManagerCount(managerRes.data);
        setEventCount(eventRes.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div style={{
      backgroundColor: "#f4f7fc",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px 0"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "600",
          color: "#2C3E50",
          marginBottom: "30px"
        }}>
          Admin Dashboard
        </h2>

        <div style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            width: "280px",
            textAlign: "center"
          }}>
            <h4 style={{
              color: "#333",
              fontWeight: "600",
              marginBottom: "15px"
            }}>
              Customers
            </h4>
            <p style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#007bff"
            }}>
              {customerCount}
            </p>
          </div>

          <div style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            width: "280px",
            textAlign: "center"
          }}>
            <h4 style={{
              color: "#333",
              fontWeight: "600",
              marginBottom: "15px"
            }}>
              Managers
            </h4>
            <p style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#28a745"
            }}>
              {managerCount}
            </p>
          </div>

          <div style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            width: "280px",
            textAlign: "center"
          }}>
            <h4 style={{
              color: "#333",
              fontWeight: "600",
              marginBottom: "15px"
            }}>
              Events
            </h4>
            <p style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#ff5722"
            }}>
              {eventCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
