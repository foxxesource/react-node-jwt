import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      // Remove the navigate call to allow the home page to show for non-logged-in users
      // navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: "'Inter', sans-serif",
        fontSize: '1.2rem',
        color: '#555'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      {user ? (
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            color: '#121212',
            marginBottom: '1rem',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            ':hover': {
              color: '#000',
              letterSpacing: '1px'
            }
          }}>
            Welcome back, <span style={{ fontWeight: 500 }}>{user.username}</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '600px',
            lineHeight: '1.6',
            transition: 'all 0.3s ease',
            ':hover': {
              color: '#444'
            }
          }}>
            You're now viewing the full website experience. Explore your personalized content.
          </p>
        </div>
      ) : (
        <div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 300,
            color: '#121212',
            marginBottom: '1.5rem',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            ':hover': {
              color: '#000',
              letterSpacing: '1px'
            }
          }}>
            Welcome to Our Platform
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '500px',
            lineHeight: '1.6',
            transition: 'all 0.3s ease',
            ':hover': {
              color: '#444'
            }
          }}>
            Please login to access all features.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;