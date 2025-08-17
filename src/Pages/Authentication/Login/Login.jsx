import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser, FaUserShield, FaUserCog } from "react-icons/fa";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginLottie from "../../../assets/Loties/Login.json";
import ConLottie from "../../../assets/Loties/congratulation.json";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("user"); // Default role
  const { signInUser, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  // Role configurations
  const roles = {
    user: {
      title: "User Login",
      icon: <FaUser />,
      gradient: "from-primary to-secondary",
      hoverGradient: "hover:from-secondary hover:to-primary",
    },
    moderator: {
      title: "Moderator Login",
      icon: <FaUserShield />,
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "hover:from-red-500 hover:to-orange-500",
    },
    admin: {
      title: "Admin Login",
      icon: <FaUserCog />,
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "hover:from-pink-500 hover:to-purple-500",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Add role to the login data
    const loginData = {
      ...data,
      role: selectedRole,
    };

    signInUser(loginData.email, loginData.password, loginData.role)
      .then((result) => {
        const user = result.user;
        // You can store the role in user object or local storage
        user.role = selectedRole;

        Swal.fire({
          icon: "success",
          title: `${
            roles[selectedRole].title.split(" ")[0]
          } Login Successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(user);
        setTimeout(() => {
          navigate(from);
        }, 1500);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError(""); // Clear any existing errors
    reset(); // Reset form when switching roles
  };

  const currentRole = roles[selectedRole];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>{currentRole.title} | TechLooma</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl w-full max-w-5xl flex flex-col-reverse md:flex-row overflow-hidden"
      >
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-secondary-content">
          {/* Role Switcher */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              {Object.entries(roles).map(([role, config]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                    ${
                      selectedRole === role
                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                        : "bg-transparent border border-primary-content/30 text-primary-content hover:border-primary"
                    }
                  `}
                >
                  <span>{config.icon}</span>
                  <span className="text-sm font-medium capitalize">{role}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={selectedRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-primary text-center mb-8 flex items-center justify-center space-x-2">
              <span>{currentRole.icon}</span>
              <span>{currentRole.title}</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="group relative">
                <label className="block text-sm mb-2 text-primary-content">
                  Email
                </label>
                <div className="flex items-center border-b border-primary-content group-focus-within:border-primary transition-all duration-300 px-2">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder={`Enter ${selectedRole} email`}
                    defaultValue={
                      selectedRole === "user"
                        ? "user@techlooma.com"
                        : selectedRole === "moderator"
                        ? "moderator@techlooma.com"
                        : "admin@techlooma.com"
                    }
                    className="bg-transparent w-full py-2 px-2 focus:outline-none text-secondary-content placeholder-primary-content"
                  />
                  <span className="text-primary-content pr-2">
                    {currentRole.icon}
                  </span>
                </div>
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}
                {error && <p className="text-red-500">Invalid Email</p>}
              </div>

              {/* Password */}
              <div className="group relative">
                <label className="block text-sm mb-2 text-primary-content">
                  Password
                </label>
                <div className="flex items-center border-b border-primary-content group-focus-within:border-primary transition-all duration-300 px-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    placeholder={`Enter ${selectedRole} password`}
                    defaultValue={
                      selectedRole === "user"
                        ? "User@123"
                        : selectedRole === "moderator"
                        ? "Moderator@123"
                        : "Admin@123"
                    }
                    className="bg-transparent w-full py-2 px-2 focus:outline-none text-secondary-content placeholder-primary-content"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-primary-content pr-2 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password Must be 6 characters or longer
                  </p>
                )}
                {error && <p className="text-red-500">Invalid Password</p>}
              </div>

              {/* Login Button */}
              <button
                className={`
                  w-full py-2 mt-4 rounded-full bg-gradient-to-r ${currentRole.gradient} 
                  text-white font-semibold shadow-lg ${currentRole.hoverGradient} 
                  transition-all cursor-pointer
                `}
              >
                Login as{" "}
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </button>

              {/* Sign Up */}
              <p className="text-sm text-primary-content text-center">
                Don't have an account?{" "}
                <Link
                  state={{ from, role: selectedRole }}
                  to="/auth/register"
                  className="text-primary hover:underline"
                >
                  Sign Up as{" "}
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                </Link>
              </p>
            </form>

            {/* Only show social login for regular users */}
            {selectedRole === "user" && <SocialLogIn />}

            {/* Role-specific notice */}
            <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <div className="text-xs text-primary-content/60 text-center">
                <p>Default Credentials:</p>
                <p>
                  {selectedRole === "user" &&
                    "Email: user@techlooma.com | Password: User@123"}
                  {selectedRole === "moderator" &&
                    "Email: moderator@techlooma.com | Password: Moderator@123"}
                  {selectedRole === "admin" &&
                    "Email: admin@techlooma.com | Password: Admin@123"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right - Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="w-full md:w-1/2 border-r-1 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] text-secondary-content p-10"
        >
          <div className="">
            <TechLoomaLogo></TechLoomaLogo>
          </div>
          <div className="relative">
            <div className="flex justify-center items-center h-full">
              <Lottie
                className="w-full h-full"
                animationData={loginLottie}
                loop={true}
              ></Lottie>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <Lottie
                className="w-full"
                animationData={ConLottie}
                loop={true}
              ></Lottie>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
