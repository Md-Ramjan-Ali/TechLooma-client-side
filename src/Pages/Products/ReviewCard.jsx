import React from 'react';

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerImage, rating, description } = review;

  return (
    <div className="p-4 bg-base-100 shadow rounded">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={reviewerImage}
          alt={reviewerName}
          className="w-10 h-10 rounded-full"
        />
        <h4 className="font-bold">{reviewerName}</h4>
      </div>
      <p className="text-sm text-yellow-500">⭐ {rating}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default ReviewCard;
