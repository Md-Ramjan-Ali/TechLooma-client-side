import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar></Navbar>
      <main className="min-h-[calc(100vh-120px-300px)] bg-base-content">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;