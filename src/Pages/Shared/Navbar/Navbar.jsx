import React from "react";
import {  Link, NavLink } from "react-router";
// import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { RiArrowDropDownLine } from "react-icons/ri";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";
// import DarkToggler from "../../../Components/DarkToggler/DarkToggler";

const Navbar = () => {


  // const handleLogOut = () => {
  //   logOUt();

  //   Swal.fire({
  //     icon: "success",
  //     title: "LogOut Successfully",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <nav className="navbar backdrop-blur-sm bg-base-content/90  shadow-sm px-10 sticky top-0 z-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden text-secondary-content">
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
        {/* <div className="flex items-center">
          <DarkToggler></DarkToggler>
        </div> */}

        {/* <div
          className="cursor-pointer "
          data-tooltip-id="my-tooltip"
          data-tooltip-place="left"
          data-tooltip-content={user?.displayName}
        >
          {user ? (
            <img
              className="rounded-full max-w-10 max-h-10  w-full h-full card shadow-sm"
              src={`${user ? user?.photoURL : ""}`}
              alt=""
            />
          ) : (
            ""
          )}
        </div> */}

        {/* {user ? (
          <button
            onClick={handleLogOut}
            className="btn bg-secondary border-2 dark:border-secondary hover:bg-secondary dark:bg-transparent text-white"
          >
            LogOut
          </button>
        ) : (
          <>
            <Link to="/auth/login">
              <button className="btn bg-primary hover:bg-secondary text-white">
                Login
              </button>
            </Link>
          </>
        )} */}
        <Link to="/auth/login">
          {" "}
          <button className="btn bg-transparent text-secondary-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-2xl rounded-br-2xl">
            Login
          </button>
        </Link>
      </div>
      {/* <Tooltip id="my-tooltip" /> */}
    </nav>
  );
};

export default Navbar;
