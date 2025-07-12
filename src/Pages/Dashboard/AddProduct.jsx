import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FaImage } from "react-icons/fa";

const AddProduct = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const imgbbAPI = import.meta.env.VITE_IMGBB_API;

  const handleAddition = (tag) => setTags([...tags, tag]);
  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload to imgbb
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        formData
      );
      const imageUrl = imgRes.data.data.url;

      // Prepare payload
      const productData = {
        name: data.name,
        image: imageUrl,
        description: data.description,
        tags: tags.map((t) => t.text),
        externalLink: data.externalLink,
        ownerName: user?.displayName,
        ownerEmail: user?.email,
        ownerImage: user?.photoURL,
        vote: 0,
        isFeatured: false,
        status: "pending",
        timestamp: new Date(),
      };

      const res = await axios.post(
        "https://your-server-domain.com/products",
        productData
      );

      if (res.data.insertedId) {
        Swal.fire("Success", "Product added successfully!", "success");
        reset();
        setTags([]);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl mt-10"
    >
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
        </div>

        {/* Product Image */}
        <div>
          <label className="block font-medium mb-2">
            Upload Product Image<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border-b border-primary-content px-2 py-2 group-focus-within:border-primary transition-all duration-300">
            <input
              type="file"
              accept="image/*"
              className="w-full text-primary-content file:mr-4 file:py-1 file:px-3 
                         file:rounded-full file:border-0 file:text-sm 
                         file:font-semibold file:bg-primary file:text-black file:cursor-pointer"
            />
            <span className="text-primary-content pr-2">
              <FaImage />
            </span>
          </div>
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
            {...register("externalLink")}
            placeholder="https://yourapp.com"
            className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Owner Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">User Name</label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">User Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">User Image URL</label>
            <input
              value={user?.photoURL || ""}
              readOnly
              className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-200 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddProduct;
