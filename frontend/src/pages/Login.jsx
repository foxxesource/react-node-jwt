import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../App.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  useEffect(() => {
    // Check for successful Google login after redirect
    const urlParams = new URLSearchParams(window.location.search);
    const loginStatus = urlParams.get('login');

    if (loginStatus === 'success') {
      // The token is already in cookies from the backend
      // Just verify and update auth state
      const { checkAuth } = useAuth();
      checkAuth().then(() => {
        navigate('/');
      });
    } else if (urlParams.get('error')) {
      setError('Google login failed. Please try again.');
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/login/google/callback';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData); // Use the auth context login function
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '5rem auto',
      padding: '2.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      border: '1px solid rgba(0, 0, 0, 0.08)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2.5rem'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '600',
          color: '#121212',
          marginBottom: '0.5rem'
        }}>Welcome Back</h2>
        <p style={{
          color: '#666',
          fontSize: '0.95rem'
        }}>Sign in to access your account</p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#333',
            fontSize: '0.9rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }} htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#f9fafb',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
          <label style={{
            display: 'block',
            color: '#333',
            fontSize: '0.9rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }} htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#f9fafb',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box',
              paddingRight: '2.5rem'
            }}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '2.1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              padding: '0.25rem'
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.875rem',
            backgroundColor: '#121212',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
              </svg>
              Signing In...
            </>
          ) : 'Sign In'}
        </button>
      </form>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '1.5rem 0',
        color: '#666'
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
        <span style={{ padding: '0 1rem', fontSize: '0.875rem' }}>OR</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
      </div>

      <button
        onClick={handleGoogleLogin}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'white',
          color: '#121212',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
          <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00" />
          <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.6055 17.5455 13.3575 18 12 18C9.39902 18 7.19052 16.3415 6.35852 14.027L3.09752 16.5395C4.75252 19.778 8.11352 22 12 22Z" fill="#4CAF50" />
          <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855C15.6085 16.785 15.609 16.785 15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
        </svg>
        Continue with Google
      </button>

      <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        Don't have an account?{' '}
        <a href="/signup" style={{
          color: '#121212',
          fontWeight: '500',
          textDecoration: 'none',
          borderBottom: '1px solid transparent',
          transition: 'all 0.2s',
          ':hover': {
            borderBottom: '1px solid #121212'
          }
        }}>
          Create one
        </a>
      </div>
    </div>
  );
};

export default Login;