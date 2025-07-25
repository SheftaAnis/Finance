import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
   <nav className="navbar">
  <div className="nav-left">
    <Link to="/" className="nav-link">Dashboard</Link>
    <Link to="/add" className="nav-link">Add</Link>
    <Link to="/transactions" className="nav-link">Transactions</Link>
     <Link to="/analytics" className="nav-link">Analytics</Link>
  </div>
  <div className="nav-right">
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  </div>
</nav>

  );
};

export default Navbar;
