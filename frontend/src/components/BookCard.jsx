import React from "react";
import "./BookCard.css";
import coverPhoto from "../assets/images/Rectangle.png";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      {/* Left side: Image with overlay title */}
      <div className="book-image">
        <img src={coverPhoto} alt={book.title} />
        <div className="overlay-title">
          <h4>{book.title}</h4>
        </div>
      </div>

      {/* Right side: Book details */}
      <div className="book-details">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>

        {/* Stores section */}
        <div className="stores-container">
          <span>Stores:</span>
          {book.stores && book.stores.length > 0 ? (
            <div className="store-cards">
              {book.stores.map((store, index) => (
                <div className="stores" key={index}>
                  <div className="store-info">
                    <span className="store-name">{store.name}</span>
                    <span className="price">${store.price}</span>
                    <button className="sell-button">Sell</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No stores available for this book.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
