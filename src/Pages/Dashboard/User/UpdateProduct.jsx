import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { FaImage } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [productPic, setProductPic] = useState("");
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm();

  // Load product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const product = res.data;
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("externalLink", product.externalLink);
        setProductPic(product.productImage);
        setTags((product.tags || []).map((tag) => ({ id: tag, text: tag })));
        setLoading(false);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to fetch product data", "error");
      }
    };
    fetchProduct();
  }, [axiosSecure, id, setValue]);

  // Tag handlers
  const handleAddition = (tag) => setTags([...tags, tag]);
  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(uploadUrl, formData);
    setProductPic(res.data.data.url);
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.name,
        description: data.description,
        externalLink: data.externalLink,
        productImage: productPic,
        tags: tags.map((t) => t.text),
        updated_At: new Date(),
      };

      const res = await axiosSecure.put(`/products/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Product updated successfully!", "success");
        navigate("/dashboard/my-products");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl my-5"
    >
      <Helmet>
        <title>Update Product | TechLooma</title>
      </Helmet>

      <h2 className="text-2xl lg:text-3xl font-bold text-center text-cyan-400 mb-8">
        Update Tech Product
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
            className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block font-medium mb-2">
            Product Image<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border-b border-primary-content px-2 py-2">
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full text-primary-content file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black file:cursor-pointer"
            />
            <span className="text-primary-content pr-2">
              <FaImage />
            </span>
          </div>
          {productPic && (
            <img
              src={productPic}
              alt="preview"
              className="w-28 h-28 mt-2 rounded-md"
            />
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
            className="w-full bg-transparent text-secondary-content border border-primary-content rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-2">Tags</label>
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
            className="w-full bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-200 cursor-pointer"
        >
          Update Product
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateProduct;
