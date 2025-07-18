import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FiCopy, FiClock, FiUserPlus } from "react-icons/fi";

const CouponCard = ({ coupons }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Helper function to calculate remaining time
  const calculateTimeLeft = (expiryDate) => {
    const now = new Date();
    const expireTime = new Date(expiryDate);
    const diff = expireTime - now;

    if (diff <= 0) return "Expired";

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 365;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    return `${years ? `${years}y ` : ""}${
      days ? `${days}d ` : ""
    }${hours}h ${minutes}m ${seconds}s`;
  };

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = {};
      coupons.forEach((coupon) => {
        updatedTimes[coupon._id] = calculateTimeLeft(coupon.expiryDate);
      });
      setTimeLeft(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [coupons]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Exclusive <span className="text-teal-500">Discounts</span>
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        className="w-11/12 mx-auto"
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon._id}>
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border-2 border-teal-100 transform hover:scale-105 transition-all duration-300 h-full">
              {/* Ribbon */}
              <div className="absolute top-0 right-0 bg-teal-500 text-white px-4 py-1 text-xs font-bold transform rotate-45 translate-x-8 translate-y-4 w-32 text-center">
                {parseFloat(coupon.discount) * 100}% OFF
              </div>

              <div className="p-6">
                {/* Coupon Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {coupon.code}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Use code at checkout
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(coupon.code, coupon._id)}
                    className="flex items-center gap-1 bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm hover:bg-teal-100 transition-colors mr-8"
                  >
                    <FiCopy size={14} />
                    {copiedId === coupon._id ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Coupon Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {coupon.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Limited offer</span>
                    <span>65% claimed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                {/* Countdown & CTA */}
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    <span>{timeLeft[coupon._id] || "Loading..."}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <FiUserPlus /> Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CouponCard;
