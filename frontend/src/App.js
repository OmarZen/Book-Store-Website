import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Shop from './pages/Shop';
import Stores from './pages/Stores';
import Authors from './pages/Authors';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/shop" />} /> {/* Redirect to /shop */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/authors" element={<Authors />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
