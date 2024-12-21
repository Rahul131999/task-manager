import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    console.log("token", token);
    console.log("storedUser", storedUser);

    if (token && storedUser) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("decodedToken", decodedToken);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          console.log("Token expired");
          logout();
        }
      } catch (err) {
        console.error("Token decoding failed:", err.message);
        logout();
      }
    }

    setLoading(false); // Authentication process completed
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
