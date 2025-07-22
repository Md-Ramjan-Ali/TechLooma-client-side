import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";
import useAuth from "../../../hooks/useAuth";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";
import defaultLogo from "../../../assets/profileLogo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Logout Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }).catch(error=>{
      console.log(error);
    });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
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
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 p-2 shadow bg-base-content text-secondary-content w-fit"
            >
              {links}
            </ul>
          </div>
          <TechLoomaLogo></TechLoomaLogo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-8 text-secondary-content">{links}</ul>
        </div>
        <div className="navbar-end gap-5">
          <div className="relative">
            {user ? (
              <>
                <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  src={user?.photoURL || defaultLogo}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName}
                  className="w-10 h-10 rounded-full border-2 border-[#22d3ee] cursor-pointer"
                />
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
                    className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] rounded-lg border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]  z-50"
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 border-b-1 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]  text-secondary-content transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-red-400 transition cursor-pointer"
                    >
                      Logout
                    </button>
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
