import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Attempt to load saved auth token, email, and userId from local storage on initial load
        const token = localStorage.getItem('jwtToken');
        const email = localStorage.getItem('userEmail');
        const id = localStorage.getItem('userId');
        if (token) setAuthToken(token);
        if (email) setUserEmail(email);
        if (id) setUserId(id);
    }, []);

    const login = (token, email, id) => {
        setAuthToken(token);
        setUserEmail(email);
        setUserId(id);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', id);
    };

    const logout = () => {
        setAuthToken(null);
        setUserEmail(null);
        setUserId(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userEmail'); // Clear email from local storage
        localStorage.removeItem('userId'); // Clear userId from local storage
    };

    const value = {
        authToken,
        userEmail,
        userId,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};