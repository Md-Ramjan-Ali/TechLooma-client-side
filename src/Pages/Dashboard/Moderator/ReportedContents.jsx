import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";

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
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Product has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto my-5 overflow-x-auto px-4 py-8 backdrop-blur-md bg-base-content/60 border border-error/30 shadow-[0_0_20px_rgba(255,0,0,0.2)] rounded-2xl">
      <h2 className="text-2xl text-center font-bold mb-10 text-red-400">
        🛑 Reported Products Content
      </h2>

      {reportedProducts.length === 0 ? (
        <p className="text-center text-gray-300 text-lg mt-20">
          No reported products found.
        </p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr className="bg-error text-white">
              <th>No.</th>
              <th>Product</th>
              <th>Report Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td className="font-semibold text-white">{product.name}</td>
                <td className="text-red-300 font-bold">
                  {product.reportCount}
                </td>
                <td className="space-x-2">
                  <Link
                    to={`/dashboard/product/${product._id}`}
                    className="btn btn-sm btn-info"
                    title="View Details"
                  >
                    <FaExternalLinkAlt />
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error"
                    title="Delete Product"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportedContents;
