import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserInfo from "../../../hooks/useUserInfo";

const CardPaymentForm = ({ price, email, setShowModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {refetch}=useUserInfo()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents: price,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        const paymentData = {
          email,
          amount: price / 100,
          currency: "usd",
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types[0],
          type: "subscription",
        };

        const saveRes = await axiosSecure.post("/payments", paymentData);

        if (saveRes.data.insertedId) {
          await axiosSecure.patch(`/users/subscribe/${email}`);
          Swal.fire({
            icon: "success",
            title: "Subscription Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          });
          refetch()
          setShowModal(false);
        }
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <CardElement className="p-2  border rounded bg-white " />
      <button
        type="submit"
        className="btn btn-secondary w-full text-secondary-content"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${price / 100}`}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default CardPaymentForm;
