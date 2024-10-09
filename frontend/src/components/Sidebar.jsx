// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link highlighting
import './Sidebar.css';
import { FaBook, FaStore, FaUser, FaPowerOff, FaTh } from 'react-icons/fa'; // Importing icons
import logo from '../assets/images/logo.png'; // Adjusted path for the logo image

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Book Icon" className="book-icon" />
        <span className="logo-text">
          <strong>BOOK</strong> WORLD
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              to="/shop"
              className="nav-item"
              activeClassName="active"
            >
              <span className="active-indicator"></span>
              <FaTh className="nav-icon" />
              <span className="nav-text">Shop</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/stores"
              className="nav-item"
              activeClassName="active"
            >
              <span className="active-indicator"></span>
              <FaStore className="nav-icon" />
              <span className="nav-text">Stores</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/authors"
              className="nav-item"
              activeClassName="active"
            >
              <span className="active-indicator"></span>
              <FaUser className="nav-icon" />
              <span className="nav-text">Authors</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/books"
              className="nav-item"
              activeClassName="active"
            >
              <span className="active-indicator"></span>
              <FaBook className="nav-icon" />
              <span className="nav-text">Books</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="logout">
          <FaPowerOff className="nav-icon" />
          <span className="nav-text">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
