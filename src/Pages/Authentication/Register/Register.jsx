import React, { useState } from "react";
import { motion } from "framer-motion";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import { Link } from "react-router";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        className="backdrop-blur-md bg-[#0f0f0f]/60 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl w-full max-w-5xl flex flex-col-reverse md:flex-row-reverse overflow-hidden"
      >
        {/* Left - Register Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">
            Register
          </h2>

          <form className="space-y-6">
            {/* Name */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-gray-300">Name</label>
              <div className="flex items-center border-b border-gray-600 px-2 group-focus-within:border-cyan-400 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-white placeholder-gray-500"
                  required
                />
                <span className="text-gray-400 pr-2">
                  <FaUser />
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-gray-300">Email</label>
              <div className="flex items-center border-b border-gray-600 px-2 group-focus-within:border-cyan-400 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-white placeholder-gray-500"
                  required
                />
                <span className="text-gray-400 pr-2">
                  <FaEnvelope />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-gray-300">
                Password
              </label>
              <div className="flex items-center border-b border-gray-600 px-2 group-focus-within:border-cyan-400 transition-all duration-300">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-white placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 pr-2 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
              </div>
            </div>

            {/* Photo URL */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-gray-300">
                Upload Profile Photo
              </label>
              <div className="flex items-center border-b border-gray-600 px-2 py-2 group-focus-within:border-cyan-400 transition-all duration-300">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-gray-400 file:mr-4 file:py-1 file:px-3 
                 file:rounded-full file:border-0 file:text-sm 
                 file:font-semibold file:bg-cyan-400 file:text-black 
                 hover:file:bg-cyan-500"
                  required
                />
                <span className="text-gray-400 pr-2">
                  <FaImage />
                </span>
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full py-2 mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-all"
            >
              Register
            </motion.button>

            {/* Login Link */}
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-cyan-400 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Right - Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 2 }}
          className="w-full md:w-1/2 bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] text-white p-10 "
        >
          <div className="">
            <TechLoomaLogo></TechLoomaLogo>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-full">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Join TechLooma Today
            </h2>
            <p className="text-sm max-w-xs text-center">
              Become part of a growing tech community. Share, vote, and discover
              the most exciting tech products.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
