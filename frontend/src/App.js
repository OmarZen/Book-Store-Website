
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Shop from './pages/Shop';
import Stores from './pages/Stores'; // Create Stores.js later
import Authors from './pages/Authors'; // Create Authors.js later
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/shop" exact component={Shop} />
            <Route path="/stores" component={Stores} />
            <Route path="/authors" component={Authors} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
