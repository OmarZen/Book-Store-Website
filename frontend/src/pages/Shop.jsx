import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BookList from "../components/BookList";
import "./Shop.css";
import profilePhoto from "../assets/images/profile.png";
import { CiSearch } from "react-icons/ci";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    author: "",
    store: "",
    sortBy: "",
  });

  useEffect(() => {
    // Fetch books data from the API
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/stores/all');
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Flatten the data structure to extract book information
        const allBooks = data.flatMap(store =>
          store.books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            stores: store.books.map(s => ({ name: store.storeName, price: s.price })) // Adjust according to your actual data structure
          }))
        );
        
        setBooks(allBooks);
        console.log("Books fetched successfully.");
        console.log(allBooks);
      } catch (error) {
        console.log("Failed to fetch books.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.author === "" || book.author === filters.author) &&
      (filters.store === "" || book.storeName === filters.store) // Adjusted for the store filter
    );
  });

  // Define a sample user object
  const user = {
    name: "Jacob Jones",
    profilePicture: profilePhoto,
  };

  return (
    <div className="shop-page">
      <Header title="Shop" breadcrumb="Shop > Books" user={user} />

      <div className="search-filter-section">
        <div className="search-filter">
          <h2 className="browse-title">Browse Books</h2>
          <div className="filters">
            <span className="filter-title">Author:</span>
            <select name="author" onChange={handleFilterChange} value={filters.author}>
              <option value="">All</option>
              <option value="Brooklyn Simmons">Brooklyn Simmons</option>
              <option value="Cody Hudson">Cody Hudson</option>
              <option value="Marley Ball">Marley Ball</option>
              <option value="Oskar Williams">Oskar Williams</option>
            </select>
            <span className="filter-title">Store:</span>
            <select name="store" onChange={handleFilterChange} value={filters.store}>
              <option value="">All</option>
              {/* Include the store names dynamically if you have them */}
              <option value="Uptown Books">Uptown Books</option>
              <option value="Village Books">Village Books</option>
              {/* Add more store options as needed */}
            </select>
            <span className="filter-title">Sort By:</span>
            <select name="sortBy" onChange={handleFilterChange} value={filters.sortBy}>
              <option value="price">Least Price</option>
            </select>
          </div>
        </div>
        <div className="search-bar-container">
          <CiSearch className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <BookList books={filteredBooks} />
    </div>
  );
};

export default Shop;
