import React from 'react';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <div className="stores">
        {/* Check if book.stores is defined and is an array */}
        {book.stores && book.stores.length > 0 ? (
          book.stores.map((store, index) => (
            <div key={index} className="store-info">
              <span>{store.name}</span>
              <span>${store.price}</span>
              <button>Sell</button>
            </div>
          ))
        ) : (
          <p>No stores available for this book.</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
