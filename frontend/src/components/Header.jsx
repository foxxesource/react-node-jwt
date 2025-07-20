import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar" style={{
      backgroundColor: '#121212',
      padding: '0 2rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="navbar-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '70px'
      }}>
        <Link to="/" className="navbar-logo" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: '600',
          letterSpacing: '1px'
        }}>
          KADA.
        </Link>

        {user ? (
          <ul className="nav-menu" style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0
          }}>
            <li className="nav-item">
              <Link to={'/'} style={{
                color: '#f5f5f5',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                ':hover': {
                  color: '#ffffff',
                  borderBottom: '2px solid #ffffff'
                }
              }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/posts'} style={{
                color: '#f5f5f5',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                ':hover': {
                  color: '#ffffff',
                  borderBottom: '2px solid #ffffff'
                }
              }}>Titles</Link>
            </li>
            <li className="nav-item">
              <Link to={'/logout'} style={{
                color: '#f5f5f5',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                ':hover': {
                  color: '#ffffff',
                  borderBottom: '2px solid #ffffff'
                }
              }}>Log out</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu" style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0
          }}>
            <li className="nav-item">
              <Link to={'/login'} style={{
                color: '#f5f5f5',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: '#333',
                ':hover': {
                  backgroundColor: '#444'
                }
              }}>Log in</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;