import React from 'react';
import { GrGooglePlus } from 'react-icons/gr';

const SocialLogIn = () => {
  return (
    <div className="">
      <div className="divider">OR</div>
      {/* Google */}
      <button
        // onClick={() => handleGoogleSignIn()}
        className=" border-1 px-4 py-2 rounded-full  bg-[#0f0f0f]/60 text-white w-fit flex gap-2 cursor-pointer mx-auto"
      >
        <span>
          <GrGooglePlus size={24}/>
        </span>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogIn;