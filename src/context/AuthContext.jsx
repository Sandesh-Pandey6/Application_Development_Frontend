import React, { createContext, useState, useEffect } from 'react';
import { registerCustomer, registerStaff, loginUser, verifyOtp, resendOtp } from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ── Initialize auth state from localStorage ───────────────────────────────
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      if (token && savedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginUser({
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
        rememberMe: credentials.rememberMe || false
      });

      const data = response.data;

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        expiresAt: data.expiresAt
      }));

      setIsAuthenticated(true);
      setUser({ fullName: data.fullName, email: data.email, role: data.role });

      return { success: true, role: data.role };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // ── REGISTER ──────────────────────────────────────────────────────────────
  const register = async (userData) => {
    setIsLoading(true);
    try {
    let response;

    if (userData.role === 'Customer') {
      response = await registerCustomer({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        city: userData.city,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        vehicleMake: userData.make,
        vehicleModel: userData.model,
        vehicleYear: parseInt(userData.year),
        fuelType: userData.fuelType,
        numberPlate: userData.numberPlate
      });
    } else if (userData.role === 'Staff') {
      response = await registerStaff({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        city: userData.city,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        employeeId: userData.employeeId,
        department: userData.department,
        accessLevel: userData.accessLevel,
        branch: userData.branchLocation
      });
    }

    console.log('✅ Register success:', response.data);
    return { success: true, email: response.data.email, message: response.data.message };

  } catch (error) {
    console.error('❌ Register error full:', error);
    console.error('❌ Response data:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    console.error('❌ Message:', error.response?.data?.message);

    const message = error.response?.data?.message || 'Registration failed. Please try again.';
    return { success: false, error: message };
  } finally {
    setIsLoading(false);
  }
    /*try {
      let response;

      if (userData.role === 'Customer') {
        response = await registerCustomer({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          city: userData.city,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          vehicleMake: userData.make,
          vehicleModel: userData.model,
          vehicleYear: parseInt(userData.year),
          fuelType: userData.fuelType,
          numberPlate: userData.numberPlate
        });
      } else if (userData.role === 'Staff') {
        response = await registerStaff({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          city: userData.city,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          employeeId: userData.employeeId,
          department: userData.department,
          accessLevel: userData.accessLevel,
          branch: userData.branchLocation
        });
      }

      return { success: true, email: response.data.email, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }*/
  };

  // ── VERIFY OTP ────────────────────────────────────────────────────────────
  const verifyEmail = async (email, code) => {
    setIsLoading(true);
    try {
      await verifyOtp({ email, code });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid or expired OTP code.';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // ── RESEND OTP ────────────────────────────────────────────────────────────
  const resendEmail = async (email) => {
    try {
      await resendOtp({ email });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP.';
      return { success: false, error: message };
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    verifyEmail,
    resendEmail,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};