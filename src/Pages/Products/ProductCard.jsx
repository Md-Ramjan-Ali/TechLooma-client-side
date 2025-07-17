import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductCard = ({ product, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate =useNavigate()

  const {
    _id,
    name,
    productImage,
    tags,
    vote,
    ownerEmail,
    votedUsers = [],
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
    <div className="bg-base-200 shadow-md rounded-lg overflow-hidden flex flex-col">
      <img src={productImage} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            <Link
              to={`/product/${_id}`}
              className="hover:underline text-blue-600"
            >
              {name}
            </Link>
          </h2>

          <div className="flex flex-wrap gap-2 mb-3">
            {tags?.map((tag, i) => (
              <span key={i} className="badge badge-outline">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="">
          <button
            onClick={handleVote}
            disabled={hasVoted || isOwner}
            className="btn btn-sm gap-2"
            title={
              isOwner
                ? "You cannot vote on your own product"
                : hasVoted
                ? "You have already voted"
                : "Click to upvote"
            }
          >
            <FaHeart className="text-red-500" />
            {vote}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
