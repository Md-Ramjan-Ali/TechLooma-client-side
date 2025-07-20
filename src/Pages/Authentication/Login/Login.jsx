import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginLottie from '../../../assets/Loties/Login.json'
import ConLottie from '../../../assets/Loties/congratulation.json'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]=useState('')
  const { signInUser,setUser } = useAuth();
  const navigate=useNavigate()
  const location=useLocation()

  const from = location.state?.from || "/";

  const {register,handleSubmit,formState:{errors}}=useForm()
  const onSubmit=(data)=>{

    signInUser(data.email,data.password).then(result=>{
      const user=result.user
          Swal.fire({
            icon: "success",
            title: "Login Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(user)
          setTimeout(() => {
            navigate(from)
          }, 1500);
    }).catch(error=>{
      setError(error)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl w-full max-w-5xl flex flex-col-reverse md:flex-row overflow-hidden"
      >
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-secondary-content">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Login
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
                  placeholder="Enter Email"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-secondary-content placeholder-primary-content"
                />
                <span className="text-primary-content pr-2">
                  <FaUser />
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
                  placeholder="Enter password"
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
            <button className="w-full py-2 mt-4 rounded-full bg-gradient-to-r from-primary to-secondary text-secondary-content font-semibold shadow-lg hover:from-secondary hover:to-primary transition-all cursor-pointer">
              Login
            </button>

            {/* Sign Up */}
            <p className="text-sm text-primary-content text-center">
              Don't have an account?{" "}
              <Link
                state={{ from }}
                to="/auth/register"
                className="text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
          <SocialLogIn></SocialLogIn>
        </div>

        {/* Right - Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="w-full md:w-1/2 border-r-1 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] text-secondary-content p-10 relative"
        >
          <div className="">
            <TechLoomaLogo></TechLoomaLogo>
          </div>
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
