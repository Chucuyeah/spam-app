// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{
      width: '250px',
      background: 'linear-gradient(to bottom, #00c000, #008000)',
      color: 'white',
      padding: '20px',
      minHeight: '100vh',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <img src="/dpmptsp.png" alt="Logo" style={{ width: '100%', marginBottom: '20px' }} />
      <h4>Klasifikasi Spam dan Non-Spam</h4>
      <hr />
      <Link to="/" className="btn btn-outline-light w-100 mb-2">Home</Link>
      <Link to="/history" className="btn btn-outline-light w-100 mb-2">Hasil Preprocessing</Link>
      <Link to="/add" className="btn btn-outline-light w-100">Cek Komentar</Link>
    </div>
  );
}

export default Sidebar;