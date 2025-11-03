import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewEventsByManager() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [managerId, setManagerId] = useState(null);

    useEffect(() => {
        const storedManager = sessionStorage.getItem('manager');
        if (storedManager) {
            const manager = JSON.parse(storedManager);
            setManagerId(manager.id);
            fetchEvents(manager.id);
        }
    }, []);

    const fetchEvents = async (managerId) => {
        try {
            const response = await axios.get(`${config.url}/manager/vieweventsbymanager/${managerId}`);
            setEvents(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch your events');
            setEvents([]);
        }
    };

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
                <u>My Events</u>
            </h3>

            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#e74c3c" }}>
                    {error}
                </p>
            ) : events.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#e74c3c" }}>
                    No events added yet.
                </p>
            ) : (
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
                                {["Event ID", "Category", "Title", "Description", "Capacity", "Cost", "Manager Name", "Manager Email"].map((head, index) => (
                                    <th key={index} style={{
                                        padding: "16px",
                                        fontWeight: "600",
                                        textAlign: "left",
                                        borderBottom: "2px solid #ddd"
                                    }}>
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event.id} style={{
                                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                    transition: "background 0.3s"
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e6f2ff"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff"}
                                >
                                    <td style={{ padding: "14px" }}>{event.id}</td>
                                    <td style={{ padding: "14px" }}>{event.category}</td>
                                    <td style={{ padding: "14px" }}>{event.title}</td>
                                    <td style={{ padding: "14px" }}>{event.description}</td>
                                    <td style={{ padding: "14px" }}>{event.capacity}</td>
                                    <td style={{ padding: "14px" }}>{event.cost}</td>
                                    <td style={{ padding: "14px" }}>{event.manager?.name}</td>
                                    <td style={{ padding: "14px" }}>{event.manager?.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
