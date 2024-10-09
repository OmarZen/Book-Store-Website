// src/pages/Shop.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BookList from '../components/BookList';
// import './Shop.css';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [user] = useState({ name: 'User Name', profilePicture: 'path/to/profile.jpg' });

  useEffect(() => {
    // Fetch books from your backend API
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="shop">
      <Header title="Shop" user={user} />
      <div className="filters">
        <select>
          <option value="">Select Author</option>
          {/* Add authors as options */}
        </select>
        <select>
          <option value="">Select Store</option>
          {/* Add stores as options */}
        </select>
        <select>
          <option value="">Sort by</option>
          <option value="price">Least Price</option>
          {/* Add other sorting options */}
        </select>
        <input type="text" placeholder="Search for books..." />
      </div>
      <h2>Books</h2>
      <BookList books={books} />
    </div>
  );
};

export default Shop;
