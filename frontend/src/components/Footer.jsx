import React from "react";
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer style={{
      backgroundColor: '#121212',
      padding: '1.5rem 2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto' // Pushes footer to bottom if content is short
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          color: '#f5f5f5',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          &copy; {new Date().getFullYear()} Bintang. All rights reserved.
          {user && (
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              {/* Additional footer content for logged-in users if needed */}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;