import React from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";

const Footer = () => {
  return (
    <div>
      <footer className="relative bg-[#071B2E]/95 text-secondary-content pt-10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-ping"></div>
        </div>

        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-5 lg:px-0 relative z-10">
          {/* Left: Text and Image */}
          <div className="relative z-10">
            <div className=" space-y-6 mb-10">
              <TechLoomaLogo></TechLoomaLogo>
              <p className="mt-2 text-gray-300 max-w-sm">
                TechLooma is a trusted platform for discovering and exploring
                the latest tech products through community-driven reviews and
                insights.
              </p>
            </div>
          </div>
          <div className="relative z-10 space-y-10">
            <div className="">
              <h3 className="text-xl font-semibold text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <div className="space-y-5 text-gray-300">
              <div className="flex items-start gap-3">
                <FaHome className="text-xl mt-1" />
                <p>
                  TechLooma for Bangladesh, House 57, <br />
                  Road 7B, Block H, Banani, 1213, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                <p>gmramjanali8888@gmail.com</p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-xl" />
                <p>+88 01928-294516</p>
              </div>
            </div>
            <div className="flex gap-4 text-gray-300 text-lg">
              <a
                href="https://www.facebook.com/share/15NASC5RNv/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/saiful2829"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/ra_mjan8549/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="www.linkedin.com/in/md-ramjan-ali-khan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="  bg-[#071B2E]/95 border-t-1 border-primary/10 text-gray-500 mt-5 py-5 relative z-10">
          <div className="max-w-screen-xl mx-auto text-center">
            <div className="">
              © {new Date().getFullYear()} TechLooma | A Tech Launch Platform.
              All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
