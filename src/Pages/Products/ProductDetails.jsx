import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ReviewCard from "./ReviewCard";
import PostReviewForm from "./PostReviewForm";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch product details
  const { data: product = {}, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const {
    name,
    productImage,
    description,
    tags,
    vote,
    externalLink,
    ownerEmail,
    votedUsers = [],
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

  return (
    <section className="p-6 max-w-5xl mx-auto">
      {/* Product Section */}
      <div className="bg-base-200 rounded-lg shadow-lg p-4 mb-8">
        <img
          src={productImage}
          alt={name}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{name}</h1>
        <p className="mt-2">{description}</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          {tags?.map((tag, idx) => (
            <span key={idx} className="badge badge-outline">
              {tag}
            </span>
          ))}
        </div>
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-link mt-3"
          >
            Visit Product Site
          </a>
        )}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleVote}
            disabled={!user || hasVoted || isOwner}
            className="btn btn-sm btn-primary"
          >
            ❤️ {vote}
          </button>
          <button onClick={handleReport} className="btn btn-sm btn-warning">
            🚩 Report
          </button>
        </div>
      </div>

      {/* Post Review Section */}
      <PostReviewForm productId={id} refetchReviews={refetchReviews} />

      {/* Reviews Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary-content">
          Reviews
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
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
