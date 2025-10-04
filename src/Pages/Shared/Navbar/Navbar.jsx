import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";
import useAuth from "../../../hooks/useAuth";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";
import defaultLogo from "../../../assets/profileLogo.png";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">All Products</NavLink>
      </li>
      <li>
        <NavLink to="/upcomingProducts">Upcoming Products</NavLink>
      </li>
      {user && (
        <li className="relative">
          <div className="flex items-center gap-1 cursor-pointer group">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <FaChevronDown className="group-hover:text-[#22d3ee] transition-transform duration-200 group-hover:rotate-180" />
          </div>
        </li>
      )}
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <nav className=" bg-[#071B2E] border-b-1 border-primary/20  shadow-sm sticky top-0 z-100 py-2">
      <div className="navbar w-11/12 mx-auto backdrop-blur-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="lg:hidden text-secondary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 p-2 shadow bg-base-content text-secondary-content w-30"
            >
              {links}
            </ul>
          </div>
          <div className="">
            <div className="hidden md:flex">
              <TechLoomaLogo></TechLoomaLogo>
            </div>
            <div className="w-12 h-12 md:hidden ml-2">
              <img
                src={Logo}
                title="TechLooma"
                alt="TechLooma Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-8 text-secondary-content">{links}</ul>
        </div>
        <div className="navbar-end gap-5">
          <div className="relative">
            {user ? (
              <>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer border border-primary/30 px-3 py-1.5 rounded-full hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition"
                >
                  <img
                    src={user?.photoURL || defaultLogo}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-[#22d3ee] cursor-pointer"
                  />
                  <FaChevronDown
                    className={`text-[#22d3ee] transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <ReactTooltip
                  id="user-tooltip"
                  place="left"
                  style={{
                    backgroundColor: "#1f1f1f",
                    color: "#22d3ee",
                    fontWeight: "500",
                  }}
                />

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-[#1a1a1a] rounded-lg border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]  z-50"
                  >
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-primary/20">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.photoURL || defaultLogo}
                          alt="Profile"
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full border-2 border-[#22d3ee] flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0 flex-1">
                          <p className="text-[#22d3ee] font-semibold truncate">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-gray-400 text-sm truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center w-full text-left px-4 py-2 text-secondary-content hover:bg-[#22d3ee]/10 transition cursor-pointer"
                      >
                        <FaUser className="inline-block mr-3" />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogOut}
                        className="flex items-center w-full text-left px-4 py-2 text-red-400 hover:bg-red-400/10 transition cursor-pointer"
                      >
                        <FaSignOutAlt className="inline-block mr-3" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              // Not logged in: Show Login / Register
              <div className="flex gap-4">
                <Link to="/auth/login">
                  <button className="btn bg-transparent text-secondary-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-2xl rounded-br-2xl">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
