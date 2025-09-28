import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaEye,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch reported products
  const {
    data: reportedProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reported-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/reported");
      return res.data;
    },
  });

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been removed.",
            icon: "success",
            background: "#1f2937",
            color: "#f9fafb",
          });
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
          background: "#1f2937",
          color: "#f9fafb",
        });
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-red-900/20 p-6">
      <Helmet>
        <title>Report content | TechLooma</title>
      </Helmet>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/25 mb-4">
            <FaShieldAlt className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Content Moderation
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Review and manage reported products to maintain platform quality
          </p>
          <div className="flex items-center justify-center gap-2 text-red-400">
            <FaExclamationTriangle className="animate-pulse" />
            <span className="text-lg font-semibold">
              {reportedProducts.length} Reported Items
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {reportedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">All Clear!</h3>
              <p className="text-gray-300 text-lg">
                No reported products found. Your platform is running smoothly.
              </p>
            </div>
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-red-600/80 to-orange-600/80 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaExclamationTriangle className="text-yellow-300" />
                Reported Products
              </h2>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <th className="px-6 py-4 text-left font-semibold">#</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Report Count
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportedProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className="border-b border-white/10 hover:bg-white/5 transition-all duration-300 group"
                    >
                      <td className="px-6 py-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-white text-lg group-hover:text-yellow-300 transition-colors">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="inline-flex items-center gap-2">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25">
                              <span className="text-white font-bold text-lg">
                                {product.reportCount}
                              </span>
                            </div>
                            {product.reportCount > 5 && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                            )}
                          </div>
                          <span className="text-red-300 font-medium ml-2">
                            Report{product.reportCount !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/product/${product._id}`}
                            className="group/btn relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-110"
                            title="View Details"
                          >
                            <FaEye className="text-white text-lg group-hover/btn:scale-110 transition-transform" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="group/btn relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-110"
                            title="Delete Product"
                          >
                            <FaTrash className="text-white text-lg group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Stats */}
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Total reported products: {reportedProducts.length}</span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  System monitoring active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedContents;
