import { useState, useEffect } from 'react';

export default function CustomerProfile() {
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  if (!customer) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555' }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
        padding: '40px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
          padding: '40px 50px',
          width: '420px',
          color: '#2c3e50',
          fontSize: '16px',
          lineHeight: '1.7',
          transition: 'transform 0.3s',
          border: '1px solid #ecf0f1',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
      >
        <h2 style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: '800',
          marginBottom: '25px',
          color: '#34495e',
          letterSpacing: '0.8px',
          borderBottom: '2px solid #bdc3c7',
          paddingBottom: '10px'
        }}>
          Customer Profile
        </h2>

        <div style={{ marginTop: '20px' }}>
          <ProfileField label="Name" value={customer.name} />
          <ProfileField label="Gender" value={customer.gender} />
          <ProfileField label="Date of Birth" value={customer.dob} />
          <ProfileField label="Email" value={customer.email} />
          <ProfileField label="Username" value={customer.username} />
          <ProfileField label="Mobile No" value={customer.mobileno} />
          <ProfileField label="Company" value={customer.location} />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <p style={{
      margin: '12px 0',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px dashed #ecf0f1',
      paddingBottom: '6px'
    }}>
      <span style={{ fontWeight: '600', color: '#7f8c8d' }}>{label}:</span>
      <span style={{ color: '#2c3e50' }}>{value}</span>
    </p>
  );
}
