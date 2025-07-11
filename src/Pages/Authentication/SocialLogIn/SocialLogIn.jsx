import React from "react";
import { GrGooglePlus } from "react-icons/gr";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogIn = () => {
  const { signInGoogle, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const googleUser = result.user;
        Swal.fire({
          icon: "success",
          title: "Google Login Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(googleUser);
        setTimeout(() => {
          navigate(from);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <div className="divider">OR</div>
      {/* Google */}
      <button
        onClick={() => handleGoogleSignIn()}
        className=" border-1 px-4 py-2 rounded-full  bg-[#0f0f0f]/60 text-white w-fit flex gap-2 cursor-pointer mx-auto"
      >
        <span>
          <GrGooglePlus size={24} />
        </span>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogIn;
