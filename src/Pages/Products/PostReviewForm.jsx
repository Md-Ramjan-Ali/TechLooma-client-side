import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import useUserRole from '../../hooks/useUserRole';

const PostReviewForm = ({ productId, refetchReviews }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      reset,
    } = useForm();

  const onSubmit = async (data) => {
     const reviewData = {
       ...data,
       productId,
       reviewerEmail: user?.email,
       reviewerName: user?.displayName,
       reviewerImage: user?.photoURL,
       reviewerRole: role,
       created_At: new Date(),
     };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Review added!", "success");
        reset();
        refetchReviews();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Review submission failed.", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-base-200 p-4 rounded"
    >
      <h3 className="text-xl font-semibold">Write a Review</h3>
      <input
        readOnly
        defaultValue={user.displayName}
        className="input input-bordered w-full"
      />
      <input
        readOnly
        defaultValue={user.photoURL}
        className="input input-bordered w-full"
      />
      <textarea
        {...register("description", { required: true })}
        placeholder="Your review"
        className="textarea textarea-bordered w-full"
      ></textarea>
      {errors.description && (
        <p className="text-red-500 text-sm">Description is required</p>
      )}

      {/* Star Rating Input */}
      <div>
        <Controller
          name="rating"
          control={control}
          defaultValue={0}
          rules={{ required: true }}
          render={({ field }) => (
            <Rating
              emptySymbol={<FaRegStar className="text-yellow-400 text-xl" />}
              fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
              fractions={1}
              initialRating={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">Rating is required</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
};

export default PostReviewForm;