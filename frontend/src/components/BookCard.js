// src/components/BookCard.js
import React from 'react';
// import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.name}</h3>
      <p>Author: {book.author.name}</p>
      <div className="stores">
        {book.stores.map(store => (
          <div key={store.id}>
            <p>{store.name}: ${store.price}</p>
            <button>Sell</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
