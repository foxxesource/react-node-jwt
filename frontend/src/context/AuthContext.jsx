// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        isLoading: true
    });
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/auth/check-auth', { 
                withCredentials: true 
            });
            
            setAuthState({
                user: data.user || null,
                isAuthenticated: data.isAuthenticated || false,
                isLoading: false
            });
            
            return data.isAuthenticated;
        } catch (error) {
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
            return false;
        }
    };

    const login = async (credentials) => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await axios.post(
                'http://localhost:3000/auth/login', 
                credentials, 
                { withCredentials: true }
            );
            
            // Immediately update state with the returned user data
            setAuthState({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            });
            
            return response.data;
        } catch (error) {
            setAuthState(prev => ({ 
                ...prev, 
                isLoading: false 
            }));
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout', {}, { 
                withCredentials: true 
            });
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Initialize auth state on mount
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            user: authState.user,
            isAuthenticated: authState.isAuthenticated,
            isLoading: authState.isLoading,
            login,
            logout,
            checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);