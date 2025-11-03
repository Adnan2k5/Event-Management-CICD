export default function About() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h4 style={{ color: '#2c3e50', fontSize: '24px', marginBottom: '10px' }}>
        Hello all,
      </h4>
      <p style={{ color: '#34495e', fontSize: '18px', lineHeight: '1.6' }}>
        As a part of our skill development project this semester, we have made
        this event management platform which has 3 pages: <strong>Customer</strong>,{' '}
        <strong>Admin</strong>, and <strong>Manager</strong>. Please go through
        them and give us your feedback.
      </p>
    </div>
  );
}