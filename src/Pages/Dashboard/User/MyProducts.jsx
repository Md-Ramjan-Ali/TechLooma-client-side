import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading,setLoading]=useState(true)

  // Fetch my products with refetch
  const {
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      setLoading(false)
      return res.data;
    },
    enabled: !!user?.email,
  });

 

  // Handle Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (err) {
        console.log(err);
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

   if (loading) return <Loading></Loading>;


  return (
    <div className="w-11/12 mx-auto my-5 p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        My Products
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-secondary-content border border-primary ">
          <thead className="bg-cyan-600 text-secondary-content">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Votes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-cyan-800/20 border-b-1 border-primary"
              >
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.votes || 0}</td>
                <td>
                  <span
                    className={` text-xs font-semibold capitalize ${
                      product.status === "accepted"
                        ? "text-green-500"
                        : product.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {product.status || "Pending"}
                  </span>
                </td>
                <td className="flex gap-5">
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
