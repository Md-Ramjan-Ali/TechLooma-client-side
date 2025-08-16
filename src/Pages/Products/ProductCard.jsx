import React from "react";
import { motion } from "framer-motion";
import { FaCaretUp, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductCard = ({ product, refetch }) => {
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl flex flex-col h-full"
    >
      {/* Product Image with Hover Effect */}
      <div className=" overflow-hidden h-64">
        <img
          src={productImage}
          alt={name}
          className="w-full h-full object-center rounded-tl-xl rounded-tr-xl transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="p-5 flex-grow flex flex-col space-y-6 text-secondary-content">
        {/* Product Name */}
        <div className="flex justify-between items-center">
          <div className="">
            <h2 className="text-xl font-bold mb-3 text-blue-600 transition-colors">
              <Link to={`/product/${_id}`} className="">
                {name}
              </Link>
            </h2>
            <p className="text-sm text-gray-300 -mt-2">By {ownerName}</p>
          </div>
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
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
        <p className="line-clamp-2 mt-3">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
