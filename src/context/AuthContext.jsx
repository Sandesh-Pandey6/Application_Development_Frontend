import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state (check local storage, token, etc.)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // TODO: Call .NET backend API
      // const response = await api.post('/api/auth/login', credentials);
      // const data = response.data;
      
      // Temporary: Simulate successful login flow until API is connected
      localStorage.setItem('token', 'temp-auth-token');
      setIsAuthenticated(true);
      setUser({ role: credentials.role });
      return { success: true };
    } catch (error) {
      console.error('Login error', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // TODO: Call .NET backend API
      // const response = await api.post('/api/auth/register', userData);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
