import axiosInstance from './axiosInstance';

export const getDashboardData = async () => {
  const response = await axiosInstance.get('/Admin/dashboard');
  return response.data;
};

export const getPartsData = async () => {
  const response = await axiosInstance.get('/Admin/parts');
  return response.data;
};
