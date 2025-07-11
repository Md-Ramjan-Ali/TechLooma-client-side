import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="bg-base-content">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;