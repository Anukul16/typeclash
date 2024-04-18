import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="container">
      <h1 className="heading">TypeClash.in</h1>
      <div className="nav-container" id="nav-container">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Test</Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/room" className="nav-link">Room</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
