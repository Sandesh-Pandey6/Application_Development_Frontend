import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-primary mb-6">Login Page Placeholder</h2>
        <p className="text-slate-500 mb-8">This is a placeholder for the login page.</p>
        <Link to="/register" className="text-blue-600 hover:underline">Go to Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
