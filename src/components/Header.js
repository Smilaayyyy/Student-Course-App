import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg';

function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Course App
      </Link>
      <Link to="/dashboard" style={styles.profile}>
        {/* Replace with actual profile logo if available */}
        <img src={logo} alt="Logo" 

          style={styles.profileImage} 
        />
        {/* Alternatively, use text */}
        {/* <span>Profile</span> */}
      </Link>
    </header>
  );
}
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '24px',
  },
  profile: {
    textDecoration: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  }
};

export default Header;