import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";
import Loading from "../Loading/Loading";

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

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="px-5 py-16 bg-[#071B2E] ">
      <div className="w-11/12 mx-auto">
        <div className="md:flex justify-between items-start mb-10 text-secondary-content">
          <div>
            <span className="bg-primary text-xs font-medium px-3 py-1 rounded-tl-2xl rounded-br-2xl uppercase mb-2 inline-block">
              Reviews
            </span>
            <h2 className="text-4xl font-bold leading-snug">
              Hear From Our <br /> Satisfied Customers
            </h2>
          </div>
          <p className="max-w-md mt-6 md:mt-0">
            See how real users are benefiting from our platform — sharing
            experiences, building trust, and achieving success with our
            solutions.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Grid]}
          className="rounded-xl !pb-[3rem]"
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
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl flex flex-col text-secondary-content h-[180px]">
                <div className="flex justify-between mb-4 border-b-1 border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] p-4">
                  <h4 className="font-bold  capitalize">
                    {review.reviewerName}
                  </h4>
                  <span className="text-sm capitalize">
                    {review.reviewerRole} Review
                  </span>
                </div>

                <div className="flex gap-4 items-start px-5 pb-5">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex flex-col justify-start">
                    <p className="line-clamp-2">
                      {review.description ||
                        "This platform helped me gain visibility for my product and engage with a real tech-focused community."}
                    </p>
                    <p className="">
                      <StarRating rating={parseInt(review.rating)} />
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomersReview;
