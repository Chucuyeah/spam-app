import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import History from './pages/History';
import AddData from './pages/AddData';

function App() {
  return (
    <Router>
      <Sidebar />
      <div style={{
        marginLeft: '250px',  // Tambahan penting agar tidak tertutup sidebar
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/add" element={<AddData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
