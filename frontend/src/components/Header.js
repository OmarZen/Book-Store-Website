// src/components/Header.js
import React from 'react';
// import './Header.css';

const Header = ({ title, user }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h1>{title}</h1>
        <p className="breadcrumb">Home {title}</p>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <img src={user.profilePicture} alt={user.name} />
          <span>{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
