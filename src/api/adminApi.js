import axiosInstance from './axiosInstance';

export const getDashboardData = async () => {
  const response = await axiosInstance.get('/Admin/dashboard');
  return response.data;
};

export const getPartsData = async () => {
  const response = await axiosInstance.get('/Admin/parts');
  return response.data;
};

export const getStaffData = async () => {
  const response = await axiosInstance.get('/Admin/staff');
  return response.data;
};

export const getPurchaseInvoicesData = async () => {
  const response = await axiosInstance.get('/Admin/purchase-invoices');
  return response.data;
};

export const getFinancialReportData = async (period = 'monthly') => {
  const response = await axiosInstance.get(`/Admin/financial-reports?period=${period}`);
  return response.data;
};

export const getInventoryReportData = async () => {
  const response = await axiosInstance.get('/Admin/inventory-reports');
  return response.data;
};

export const getNotificationsData = async () => {
  const response = await axiosInstance.get('/Admin/notifications');
  return response.data;
};



