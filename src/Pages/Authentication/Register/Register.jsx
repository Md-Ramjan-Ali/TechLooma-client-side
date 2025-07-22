import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import TechLoomaLogo from "../../../Components/TechLoomaLogo/TechLoomaLogo";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useSaveUser from "../../../Utility/useSaveUser";
import Lottie from "lottie-react";
import registerLottie from "../../../assets/Loties/Registration animation.json";
import registerCongras from "../../../assets/Loties/congratulations.json";
import { Slide, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const { createUser, updateUser, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const saveUser = useSaveUser();

  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
  //  profile pic validation
    if (!profilePic) {
      toast.error("Please upload your profile photo");
      return;
    }
    //password validation
    const upper = /[A-Z]/.test(data.password);
    const lower = /[a-z]/.test(data.password);
    if (data.password.length < 6 || !upper || !lower) {
      toast.error(
        "Password must be at least 6 characters and include uppercase and lowercase letters",
        {
          position: "top-right",
          autoClose: 4000,
          theme: "dark",
          transition: Slide,
        }
      );
      return;
    }

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        const user = result.user;
        Swal.fire({
          icon: "success",
          title: "Register Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        // save userInfo in database
        await saveUser({
          ...user,
          displayName: data.name,
          photoURL: profilePic,
        });

        // update user info
        const updatePro = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUser(updatePro)
          .then(() => {
            setUser({ ...user, updatePro });
            setTimeout(() => {
              navigate(from);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    const res = await axios.post(imagUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <Helmet>
        <title>Register | TechLooma</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl w-full max-w-5xl flex flex-col-reverse md:flex-row-reverse overflow-hidden"
      >
        {/* Left - Register Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-secondary-content">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-primary-content">
                Name
              </label>
              <div className="flex items-center border-b border-primary-content px-2 group-focus-within:border-primary transition-all duration-300">
                <input
                  type="name"
                  {...register("name", { required: true })}
                  placeholder="Your full name"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-secondary-content placeholder-primary-content"
                  required
                />
                <span className="text-primary-content pr-2">
                  <FaUser />
                </span>
              </div>
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-primary-content">
                Email
              </label>
              <div className="flex items-center border-b border-primary-content px-2 group-focus-within:border-primary transition-all duration-300">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Email"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-secondary-content placeholder-primary-content"
                  required
                />
                <span className="text-primary-content pr-2">
                  <FaEnvelope />
                </span>
              </div>
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="group relative">
              <label className="block text-sm mb-2 text-primary-content">
                Password
              </label>
              <div className="flex items-center border-b border-primary-content px-2 group-focus-within:border-primary transition-all duration-300">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Enter password"
                  className="bg-transparent w-full py-2 px-2 focus:outline-none text-secondary-content placeholder-primary-content"
                  required
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
                  Password must be 6 characters or longer
                </p>
              )}
            </div>

            {/* Photo URL file*/}
            <div className="group relative">
              <label className="block text-sm mb-2 text-primary-content">
                Upload Profile Photo
              </label>
              <div className="flex items-center border-b border-primary-content px-2 py-2 group-focus-within:border-primary transition-all duration-300">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="w-full text-primary-content file:mr-4 file:py-1 file:px-3 
                 file:rounded-full file:border-0 file:text-sm 
                 file:font-semibold file:bg-primary file:text-black file:cursor-pointer
                 "
                />
                <span className="text-primary-content pr-2">
                  <FaImage />
                </span>
              </div>
            </div>

            {/* Register Button */}
            <button className="w-full py-2 mt-4 rounded-full bg-gradient-to-r from-primary to-secondary text-secondary-content font-semibold shadow-lg hover:from-secondary hover:to-primary transition-all cursor-pointer">
              Register
            </button>

            {/* Login Link */}
            <p className="text-sm text-secondary-content text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
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
          className="w-full md:w-1/2 border-r-1 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] text-secondary-content p-10"
        >
          <div className="">
            <TechLoomaLogo></TechLoomaLogo>
          </div>
          <div className="relative">
            <div className="flex justify-center items-center h-full">
              <Lottie
                className="w-full h-full"
                animationData={registerLottie}
                loop={true}
              ></Lottie>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <Lottie
                className="w-full"
                animationData={registerCongras}
                loop={true}
              ></Lottie>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
