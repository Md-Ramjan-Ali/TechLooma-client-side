import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";

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

const CustomersReview = () => {
  const axiosInstance = useAxios();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex justify-between items-start mb-10">
          <div>
            <span className="bg-yellow-400 text-xs font-medium px-3 py-1 rounded-full mb-2 inline-block">
              Verified Reviews
            </span>
            <h2 className="text-4xl font-bold text-gray-900 leading-snug">
              What Our Users <br /> Are Saying
            </h2>
          </div>
          <p className="max-w-md text-gray-600 mt-6 md:mt-0">
            Discover how real users are experiencing our platform — from
            launching products to exploring the latest tech.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Grid]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 1,
              grid: {
                rows: 2,
              },
            },
            1024: {
              slidesPerView: 2,
              grid: {
                rows: 2,
              },
            },
          }}
          style={{ paddingBottom: "3rem" }} // to leave space for pagination
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-gray-50 rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between h-full">
                <div className="flex justify-between mb-4">
                  <h4 className="font-bold text-gray-800 capitalize">
                    {review.reviewerName}
                  </h4>
                  <span className="text-sm text-gray-500 capitalize">
                    {review.reviewerRole} Review
                  </span>
                </div>
                <div className="flex gap-4 items-center mb-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <p className="text-gray-700">
                    {review.description ||
                      "This platform helped me gain visibility for my product and engage with a real tech-focused community."}
                  </p>
                </div>
                <StarRating rating={parseInt(review.rating)} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomersReview;
