import React from 'react';
import { NavLink, Outlet } from 'react-router';
import TechLoomaLogo from '../Components/TechLoomaLogo/TechLoomaLogo';
import { FaChartPie, FaFlag, FaGavel, FaHome, FaPlus, FaThList, FaTicketAlt, FaUser, FaUsers } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

import "../Styles/dashboard.css";

const DashboardLayout = () => {
  const { role, isLoading } = useUserRole();
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-content">
        {/* Navbar */}
        <div className="navbar w-full lg:hidden bg-base-content">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current text-secondary-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden text-secondary-content">
            Dashboard
          </div>
        </div>
        {/* Page content here */}
        <div className="bg-base-content text-secondary-content min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side bg-base-content/90">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  text-secondary-content  min-h-full w-72 p-4">
          {/* Sidebar content here */}
          <div className="border-b-1 py-5 mb-5">
            <TechLoomaLogo></TechLoomaLogo>
          </div>

          {/* admin dashboard */}
          {!isLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/statistics">
                  <FaChartPie className="inline-block mr-2" />
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers className="inline-block mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-coupons">
                  <FaTicketAlt className="inline-block mr-2" />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}

          {/* moderator dashboard */}
          {!isLoading && role === "moderator" && (
            <>
              <li>
                <NavLink to="/dashboard/product-review">
                  <FaGavel className="inline-block mr-2" />
                  Product Review Queue
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/report-content">
                  <FaFlag className="inline-block mr-2" />
                  Reported Contents
                </NavLink>
              </li>
            </>
          )}

          {/* user dashboard */}
          {!isLoading && role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/my-profile">
                  <FaUser className="inline-block mr-2" />
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/add-product">
                  <FaPlus className="inline-block mr-2" />
                  Add Product
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-products">
                  <FaThList className="inline-block mr-2" />
                  My Products
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;