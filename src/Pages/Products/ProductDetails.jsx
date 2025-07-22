import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ReviewCard from "./ReviewCard";
import PostReviewForm from "./PostReviewForm";
import {
  FaCalendarAlt,
  FaCaretUp,
  FaExternalLinkAlt,
  FaFlag,
  FaHeart,
  FaRegHeart,
  FaThumbsUp,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Fetch product details
  const { data: product = {}, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const {
    name,
    productImage,
    description,
    tags,
    externalLink,
    ownerName,
    ownerImage,
    ownerEmail,
    vote,
    votedUsers = [],
    create_At,
    // updated_At,
    // isReported,
    reportCount,
  } = product;

  const hasVoted = votedUsers.includes(user?.email);
  const isOwner = user?.email === ownerEmail;
  const alreadyReported = product?.reports?.some(
    (r) => r.reporterEmail === user?.email
  );

  // Handle Upvote
  const handleVote = async () => {
    if (!user) return;
    try {
      const res = await axiosSecure.patch(`/products/${id}/vote`, {
        userEmail: user?.email,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Thanks!", "Vote submitted successfully!", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire(
        "Oops!",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  // Handle Report
  const handleReport = async () => {
    if (alreadyReported) {
      Swal.fire(
        "Already Reported",
        "You have already reported this product.",
        "info"
      );
      return;
    }

    try {
      const res = await axiosSecure.patch(`/products/${id}/report`, {
        userEmail: user?.email,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Reported!", "Product has been reported.", "success");
      }
    } catch (err) {
      Swal.fire(
        "Oops!",
        err.response?.data?.message || "Report failed!",
        "error"
      );
    }
  };

  const formattedDate = new Date(create_At).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="p-5 w-full md:w-9/12 mx-auto">
      <Helmet>
        <title>Details | TechLooma</title>
      </Helmet>

      {/* Product Section */}
      <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-between gap-3">
          <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl overflow-hidden">
            <img
              src={productImage}
              alt={name}
              className="w-full h-80 md:h-96 object-center p-4 rounded-xl"
            />
          </div>
          {/* Owner Card */}
          <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-5 text-secondary-content overflow-scroll">
            <h2 className="text-xl font-semibold mb-4">Product Owner</h2>
            <div className="flex items-center gap-4">
              <img
                src={ownerImage}
                alt={ownerName}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
              />
              <div>
                <h3 className="font-bold ">{ownerName}</h3>
                <p className=" text-sm">{ownerEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 lg:w-3/5">
          <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-5 text-secondary-content">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{name}</h1>
              {product.isFeatured && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className=" whitespace-pre-line">{description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-3 text-secondary-content text-center">
                <div className="flex items-center justify-center gap-2 ">
                  <FaThumbsUp className="text-primary" />
                  <span className="font-medium">Votes</span>
                </div>
                <div className="text-2xl font-bold ">{vote}</div>
              </div>

              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-3 text-secondary-content text-center">
                <div className="flex items-center justify-center gap-2 ">
                  <FaFlag className="text-red-500" />
                  <span className="font-medium">Reports</span>
                </div>
                <div className="text-2xl font-bold ">{reportCount || 0}</div>
              </div>

              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-3 text-secondary-content text-center">
                <div className="flex items-center justify-center gap-2 ">
                  <FaCalendarAlt className="text-primary" />
                  <span className="font-medium">Created</span>
                </div>
                <div className="text-sm font-medium ">{formattedDate}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleVote}
                disabled={hasVoted || isOwner}
                className={`flex items-center gap-1  w-fit px-2 py-1 justify-center transition-all backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded ${
                  hasVoted || isOwner
                    ? "text-secondary-content cursor-not-allowed"
                    : "cursor-pointer"
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
                <span>
                  {hasVoted ? "Voted" : isOwner ? "Your Product" : "Upvote"}
                </span>
              </button>

              <button
                onClick={handleReport}
                disabled={!user || isOwner}
                className={`flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded ${
                  alreadyReported
                    ? " text-red-500 cursor-not-allowed"
                    : isOwner
                    ? "cursor-not-allowed"
                    : " text-red-500 cursor-pointer"
                } transition-colors`}
              >
                <FaFlag />
                <span>{alreadyReported ? "Reported" : "Report"}</span>
              </button>

              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded text-secondary transition-colors"
                >
                  <FaExternalLinkAlt />
                  <span>Visit Site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Review Section */}
      <PostReviewForm productId={id} refetchReviews={refetchReviews} />

      {/* Reviews Section */}
      <div className="my-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-secondary-content text-center bg-primary w-fit mx-auto px-10 py-3 rounded-tl-full rounded-br-full">
          Reviews
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {reviews.length ? (
            reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
