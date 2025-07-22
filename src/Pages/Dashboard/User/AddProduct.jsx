import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { FaImage } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserInfo from "../../../hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [productPic, setProductPic] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserInfo();
  const isSubscribed = userInfo?.subscribed;

  const handleAddition = (tag) => setTags([...tags, tag]);
  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));

  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      setLoading(false);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Limit post product
      if (!isSubscribed && myProducts.length >= 1) {
        Swal.fire({
          icon: "error",
          title: "Limit Reached",
          text: "You can only add 1 product. Subscribe to add more.",
        });
        return;
      }

      // Prepare product data
      const productData = {
        name: data.name,
        productImage: productPic,
        description: data.description,
        tags: tags.map((t) => t.text),
        externalLink: data.externalLink,
        ownerName: user?.displayName,
        ownerEmail: user?.email,
        ownerImage: user?.photoURL,
        vote: 0,
        isFeatured: false,
        status: "pending",
        create_At: new Date(),
      };

      const res = await axiosSecure.post("/products", productData);
      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire("Success", "Product added successfully!", "success");
        reset();
        refetch();
        setTags([]);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    const res = await axios.post(imagUploadUrl, formData);
    setProductPic(res.data.data.url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl my-5"
    >
      <Helmet>
        <title>Add Product | TechLooma</title>
      </Helmet>

      <h2 className="text-2xl lg:text-3xl font-bold text-center text-cyan-400 mb-8">
        Add Tech Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-2">
            Product Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter Product Name"
            className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              Product name is required
            </span>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="block font-medium mb-2">
            Upload Product Image<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border-b border-primary-content px-2 py-2 group-focus-within:border-primary transition-all duration-300">
            <input
              type="file"
              {...register("image", { required: true })}
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full text-primary-content file:mr-4 file:py-1 file:px-3 
                         file:rounded-full file:border-0 file:text-sm 
                         file:font-semibold file:bg-primary file:text-black file:cursor-pointer"
            />
            <span className="text-primary-content pr-2">
              <FaImage />
            </span>
          </div>
          {errors.image && (
            <span className="text-red-500 text-sm">
              Product image is required
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows="4"
            placeholder="Write a brief description..."
            className="w-full bg-transparent text-secondary-content border border-primary-content rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              Product description is required
            </span>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-2">
            Tags<span className="text-red-500">*</span>
          </label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="inline"
            placeholder="Add and press Enter"
            classNames={{
              tagInputField:
                "bg-transparent w-full text-secondary-content border border-gray-600 rounded px-3 py-2 focus:outline-none",
              tag: "bg-primary text-secondary-content px-2 py-1 rounded-lg mr-2 mt-1 inline-block",
              remove: "ml-1 cursor-pointer text-secondary-content",
            }}
          />
        </div>

        {/* External Link */}
        <div>
          <label className="block font-medium mb-2">External Link</label>
          <input
            type="url"
            {...register("externalLink", { required: true })}
            placeholder="https://yourapp.com"
            className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
          {errors.externalLink && (
            <span className="text-red-500 text-sm">
              Product externalLink is required
            </span>
          )}
        </div>

        {/* Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Owner Name</label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Owner Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Owner Image</label>
            <input
              value={user?.photoURL || ""}
              readOnly
              className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          // disabled={!isSubscribed && myProducts.length >= 1}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-200 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
        {!isSubscribed && myProducts.length >= 1 && (
          <p className="text-red-500 text-sm font-medium bg-red-100 border border-red-300 rounded-md px-4 py-2 mt-2">
            You've reached your product limit. Please{" "}
            <span className="font-semibold text-red-600">subscribe</span> to add
            more.{" "}
            <Link className="text-blue-500" to="/dashboard/my-profile">
              Click here..
            </Link>
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default AddProduct;
