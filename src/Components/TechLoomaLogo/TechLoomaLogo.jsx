import React from 'react';
import { Link } from 'react-router';

const TechLoomaLogo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center cursor-pointer">
        {/* <img className="w-16" src={Logo} alt="" /> */}
        <h2 className=" text-2xl font-bold">
          <span className="text-primary">Tech</span>
          <span className="">Looma</span>
        </h2>
      </Link>
    </div>
  );
};

export default TechLoomaLogo;