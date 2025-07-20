import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
  return (
    <div className="bg-base-content">
      <Outlet></Outlet>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;