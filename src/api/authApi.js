import axiosInstance from './axiosInstance';

export const loginUser = (data) =>
  axiosInstance.post('/auth/login', data);

export const registerCustomer = (data) =>
  axiosInstance.post('/auth/register/customer', data);

export const registerStaff = (data) =>
  axiosInstance.post('/auth/register/staff', data);

export const verifyOtp = (data) =>
  axiosInstance.post('/auth/verify-otp', data);

export const resendOtp = (data) =>
  axiosInstance.post('/auth/resend-otp', data);