import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCaretUp, FaCrown } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeatureCard = ({ product, refetch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    _id,
    name,
    productImage,
    tags,
    vote,
    ownerEmail,
    votedUsers = [],
    description,
    ownerName,
  } = product;

  const hasVoted = votedUsers.includes(user?.email);
  const isOwner = user?.email === ownerEmail;

  const handleVote = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please login to vote.", "warning");
      return navigate("/auth/login");
    }
    try {
      const res = await axiosSecure.patch(`/products/${_id}/vote`, {
        userEmail: user?.email,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Thanks!", "Your vote has been successfully.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire(
        "Oops!",
        err.response?.data?.message || "Something went wrong!",
        "error"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -3,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl flex flex-col h-full"
    >
      {/* Product Image with Hover Effect */}
      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="overflow-hidden w-full h-full p-5 flex justify-center items-center"
      >
        <img
          src={productImage}
          alt={name}
          className=" h-40 w-40 object-center rounded-full transition-transform duration-500 hover:scale-105"
        />
      </motion.div>

      {/* Product Content */}
      <div className="p-5 flex-grow flex flex-col space-y-6">
        {/* Product Name */}
        <div className="flex justify-center">
          <div className="flex justify-center text-center">
            <div className="">
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-secondary-content transition-colors">
                {name}
              </h2>
              <p className="text-sm text-gray-300 -mt-2">By {ownerName}</p>
            </div>
          </div>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {tags?.slice(0, 1).map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-300 hover:bg-slate-700/50 transition-colors cursor-pointer"
            >
              #{tag}
            </motion.span>
          ))}
          {tags?.length > 1 && (
            <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-400">
              +{tags.length - 1} more
            </span>
          )}
        </div>
        <p className="line-clamp-2">{description}</p>
        <div className="flex justify-between items-center ">
          <Link
            to={`/product/${_id}`}
            onClick={() =>{
              window.scrollTo(0, 0);
            }}
            className="px-4 py-2 bg-secondary text-secondary-content rounded-tr-2xl rounded-bl-2xl cursor-pointer"
          >
            Product Details
          </Link>
          {/* Vote Button */}
          <button
            onClick={handleVote}
            disabled={hasVoted || isOwner}
            className={`flex items-center gap-1 cursor-pointer w-fit px-2 py-1 rounded-lg justify-center transition-all ${
              hasVoted || isOwner
                ? "backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded text-secondary-content cursor-not-allowed"
                : "backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded"
            }`}
            title={
              isOwner
                ? "You cannot vote on your own product"
                : hasVoted
                ? "You have already voted"
                : "Click to upvote"
            }
          >
            {hasVoted || isOwner ? (
              <FaCaretUp className="text-2xl text-red-400" />
            ) : (
              <FaCaretUp className="text-2xl group-hover:fill-current" />
            )}
            <span className="text-sm font-semibold">{vote}</span>
          </button>
        </div>
      </div>
      {/* Bottom Glow Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 "
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
      <p className="absolute top-3 left-3">
        <FaCrown className="text-amber-500 text-2xl" />
      </p>
    </motion.div>
  );
};

export default FeatureCard;
