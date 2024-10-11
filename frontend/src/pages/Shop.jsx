import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BookList from "../components/BookList";
import "./Shop.css";
import profilePhoto from "../assets/images/profile.png";
import { CiSearch } from "react-icons/ci";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [stores, setStores] = useState([]);
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
        const response = await fetch("/api/stores/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
  
        const allAuthors = new Set();
        const allStores = new Set();
        const bookMap = {};
  
        // Flatten the data structure to extract book information
        data.forEach((store) => {
          allStores.add(store.storeName);
  
          store.books.forEach((book) => {
            allAuthors.add(book.author);
            
            if (bookMap[book.title]) {
              // If the book already exists, add the new store to the stores array
              bookMap[book.title].stores.push({ 
                name: store.storeName, 
                price: book.price 
              });
            } else {
              // Otherwise, create a new entry for the book
              bookMap[book.title] = {
                id: book.id,
                title: book.title,
                author: book.author,
                stores: [{ name: store.storeName, price: book.price }],
              };
            }
          });
        });
  
        setBooks(Object.values(bookMap));
        setAuthors([...allAuthors]);
        setStores([...allStores]);
        console.log("Books, authors, and stores fetched successfully.");
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

  const sortBooks = (a, b) => {
    if (filters.sortBy === "priceLowToHigh") {
      return a.stores[0].price - b.stores[0].price;
    } else if (filters.sortBy === "priceHighToLow") {
      return b.stores[0].price - a.stores[0].price;
    } else if (filters.sortBy === "alphaAZ") {
      return a.title.localeCompare(b.title);
    } else if (filters.sortBy === "alphaZA") {
      return b.title.localeCompare(a.title);
    }
    return 0; // Return 0 if no sorting is applied
  };

  const filteredBooks = books
    .filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.author === "" || book.author === filters.author) &&
        (filters.store === "" ||
          book.stores.some((store) => store.name === filters.store))
      );
    })
    .sort(sortBooks); // Apply the sorting here

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
            <select
              name="author"
              onChange={handleFilterChange}
              value={filters.author}
            >
              <option value="">All</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>

            <span className="filter-title">Store:</span>
            <select
              name="store"
              onChange={handleFilterChange}
              value={filters.store}
            >
              <option value="">All</option>
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>

            <span className="filter-title">Sort By:</span>
            <select
              name="sortBy"
              onChange={handleFilterChange}
              value={filters.sortBy}
            >
              <option value="">None</option>
              <option value="priceLowToHigh">Price (Low to High)</option>
              <option value="priceHighToLow">Price (High to Low)</option>
              <option value="alphaAZ">Alphabetical (A-Z)</option>
              <option value="alphaZA">Alphabetical (Z-A)</option>
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
