// src/components/Header.js
import React from 'react';
import './Header.css'; // Make sure to create this CSS file

const Header = ({ title, breadcrumb, user }) => {
  return (
    <>
      <div className="header">
        <div className="header-left">
          <h1 className="header-title">{title}</h1>
          <p className="breadcrumb">{breadcrumb}</p>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <img src={user.profilePicture} alt={user.name} className="profile-picture" />
            <span className="user-name">{user.name}</span>
          </div>
        </div>
      </div>
      <hr className="divider" /> {/* Add class for the divider */}
    </>
  );
};

export default Header;
