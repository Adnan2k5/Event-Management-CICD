import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewCustomers() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState("");

    const displayCustomers = async () => {
        try {
            const response = await axios.get(`${config.url}/admin/viewallcustomers`);
            setCustomers(response.data);
        } catch (err) {
            setError("Failed to fetch customers data ... " + err.message);
        }
    };

    useEffect(() => {
        displayCustomers();
    }, []);

    const deleteCustomer = async (cid) => {
        try {
            const response = await axios.delete(`${config.url}/admin/deletecustomer?cid=${cid}`);
            toast.success(response.data);
            displayCustomers();
        } catch (err) {
            console.log(err);
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message);
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
                <u>View All Customers</u>
            </h3>

            <ToastContainer position="top-center" autoClose={4000} />

            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#e74c3c" }}>
                    {error}
                </p>
            ) : customers.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#e74c3c" }}>
                    No Customer Data Found
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
                                {["ID", "Name", "Gender", "DOB", "Email", "Username", "Mobile No", "Location", "Action"].map((head, index) => (
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
                            {customers.map((customer, index) => (
                                <tr key={customer.id} style={{
                                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                    transition: "background 0.3s"
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e6f2ff"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff"}
                                >
                                    <td style={{ padding: "14px" }}>{customer.id}</td>
                                    <td style={{ padding: "14px" }}>{customer.name}</td>
                                    <td style={{ padding: "14px" }}>{customer.gender}</td>
                                    <td style={{ padding: "14px" }}>{customer.dob}</td>
                                    <td style={{ padding: "14px" }}>{customer.email}</td>
                                    <td style={{ padding: "14px" }}>{customer.username}</td>
                                    <td style={{ padding: "14px" }}>{customer.mobileno}</td>
                                    <td style={{ padding: "14px" }}>{customer.location}</td>
                                    <td style={{ padding: "14px" }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            style={{
                                                backgroundColor: "#e74c3c",
                                                color: "#fff",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                                borderRadius: "20px",
                                                padding: "6px 12px",
                                                textTransform: "capitalize"
                                            }}
                                            startIcon={<DeleteIcon />}
                                            onClick={() => deleteCustomer(customer.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
