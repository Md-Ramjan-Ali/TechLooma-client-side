import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPaymentForm from "./CardPaymentForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const SubscribeModal = ({ setShowModal, user }) => {
  const axiosSecure = useAxiosSecure();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const originalPrice = 999; // $9.99 in cents
  const finalPrice = originalPrice - discount; 

  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.get(`/validate-coupon/${coupon}`);
      //  Instead use this:
      const percentage = parseFloat(res.data.discount); // 0.5 means 50%
      const calculatedDiscount = Math.round(originalPrice * percentage); // in cents
      setDiscount(calculatedDiscount);
      setCouponError("");
    } catch (err) {
      setDiscount(0);
      setCouponError(err.response?.data?.message || "Invalid coupon");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-base-content bg-opacity-50 flex justify-center items-center">
      <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-xl p-8 max-w-md w-full text-secondary-content">
        <h2 className="text-xl font-bold mb-4 text-center">
          Subscribe to Membership
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Have a coupon?</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="input w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={() => {
                handleApplyCoupon();
              }}
              className="btn bg-secondary text-secondary-content hover:bg-secondary"
            >
              Apply
            </button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm mt-1">{couponError}</p>
          )}
          {discount > 0 && !couponError && (
            <p className="text-green-500 text-sm mt-1">
              Coupon applied successfully!
            </p>
          )}
        </div>

        <div className="mb-6 text-center">
          <p className="text-lg">
            Total:{" "}
            <span className="font-bold text-primary">${finalPrice / 100}</span>
          </p>
          {discount > 0 && (
            <p className="text-sm text-green-500">
              Coupon Discount: -{Math.round((discount / originalPrice) * 100)}%
            </p>
          )}
        </div>

        <Elements stripe={stripePromise}>
          <CardPaymentForm
            price={finalPrice}
            email={user.email}
            setShowModal={setShowModal}
          />
        </Elements>
      </div>
    </div>
  );
};

export default SubscribeModal;
