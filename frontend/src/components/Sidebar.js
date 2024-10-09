// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Create a CSS file for styles
import { FaBook } from 'react-icons/fa'; // Optional: Use a book icon from react-icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <FaBook /> BOOK WORLD
      </div>
      <nav>
        <ul>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/stores">Stores</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/books">Books</Link></li>
        </ul>
      </nav>
      <button className="logout">Log Out</button>
    </div>
  );
};

export default Sidebar;
