import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const ProductReview = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["moderator-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderator/products");
      return res.data;
    },
  });

  // product status update
  const handleUpdateStatus = async (id, statusUpdate) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${statusUpdate} this product?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${statusUpdate} it`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/products/${id}/status`, {
          status: statusUpdate,
        });
        refetch();

        Swal.fire({
          title: "Success!",
          text: `Product has been ${statusUpdate}.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Failed to update status:", err);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  //  Make Featured Handler
  const handleMakeFeatured = async (id) => {
    const result = await Swal.fire({
      title: "Make this product Featured?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make it featured",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/products/${id}/featured`, {
          isFeatured: true,
        });
        refetch();

        Swal.fire({
          title: "Success!",
          text: "Product is now Featured!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Failed to make featured:", err);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-11/12 mx-auto my-5 overflow-x-auto px-4 py-8 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
      <h2 className="text-2xl text-center font-bold mb-10">
        Product Review Queue
      </h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-primary text-secondary-content">
            <th>No.</th>
            <th>Product</th>
            <th>Status</th>
            <th>Make Featured</th>
            <th>View Details</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p._id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>
                <span
                  className={`font-semibold capitalize ${
                    p.status === "pending"
                      ? "text-yellow-500"
                      : p.status === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {p.status}
                </span>
              </td>

              <td>
                <button
                  onClick={() => handleMakeFeatured(p._id)}
                  className={`btn btn-sm ${
                    !p.isFeatured
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : " text-green-600 "
                  }`}
                  disabled={p.isFeatured}
                >
                  {p.isFeatured ? "Featured" : "Make Featured"}
                </button>
              </td>
              <td className="space-x-2">
                <Link to={`/products/${p._id}`} className="btn btn-sm btn-info">
                  View Details
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleUpdateStatus(p._id, "accepted")}
                  disabled={p.status === "accepted"}
                  className={`btn btn-sm  ${
                    p.status === "accepted" ? "text-green-500" : "btn-success"
                  }`}
                >
                  
                  {p.status === "accepted" ? "Accepted" : "Accept"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleUpdateStatus(p._id, "rejected")}
                  disabled={p.status === "rejected"}
                  className={`btn btn-sm  ${
                    p.status === "rejected" ? "text-red-500" : "btn-error "
                  }`}
                >
                  {p.status === "rejected" ? "Rejected" : "Reject"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReview;
