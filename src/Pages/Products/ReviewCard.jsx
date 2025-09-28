import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return (
    <div className="text-yellow-400 mt-2 text-lg">
      {fullStars}
      <span className="text-gray-300">{emptyStars}</span>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerImage, rating, description, reviewerRole } =
    review;

  return (
    <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl flex flex-col  h-[180px] text-secondary-content">
      <div className="flex justify-between mb-4 border-b-1 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] p-4">
        <h4 className="font-bold  capitalize">{reviewerName}</h4>
        <span className="text-sm capitalize">{reviewerRole} Review</span>
      </div>
      <div className="flex gap-4 items-center px-5 pb-5">
        <img
          src={reviewerImage}
          alt={reviewerName}
          referrerPolicy="no-referrer"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="flex flex-col justify-start">
          <p className="line-clamp-2">
            {description}
          </p>
          <div className="">
            <StarRating rating={parseInt(rating)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
