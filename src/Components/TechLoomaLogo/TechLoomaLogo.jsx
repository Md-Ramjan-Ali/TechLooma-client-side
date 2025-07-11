import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logoImage.png';

const TechLoomaLogo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center cursor-pointer">
        <img className="w-16" src={logo} alt="" />
        <h2 className=" text-2xl font-bold">
          {/* <span className="text-primary">Tech</span> */}
          <span className="text-secondary-content">Looma</span>
        </h2>
      </Link>
    </div>
  );
};

export default TechLoomaLogo;