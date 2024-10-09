import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;
