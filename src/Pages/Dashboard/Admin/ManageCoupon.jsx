import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    code: "",
    description: "",
    discount: "",
    createDate: "",
    expiryDate: "",
  });

  const { data: coupons = [], refetch, isLoading } = useQuery({
    queryKey: ["all-coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  if(isLoading){
    return <Loading></Loading>
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axiosSecure.put(`/coupons/${editingId}`, {
        ...form,
        expiryDate: new Date(form.expiryDate).toISOString(),
        discount: parseFloat(form.discount),
      });
      Swal.fire("Updated!", "Coupon updated successfully!", "success");
    } else {
      await axiosSecure.post("/coupons", {
        ...form,
        createDate: new Date().toISOString(),
        expiryDate: new Date(form.expiryDate).toISOString(),
        discount: parseFloat(form.discount),
      });
      Swal.fire("Success", "Coupon created!", "success");
    }
    setForm({ code: "", description: "", discount: "", expiryDate: "" });
    setEditingId(null);
    refetch();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the coupon permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/coupons/${id}`);
      Swal.fire("Deleted!", "Coupon has been deleted.", "success");
      refetch();
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setForm({
      code: coupon.code,
      description: coupon.description,
      discount: coupon.discount,
      expiryDate: coupon.expiryDate?.substring(0, 10),
    });
  };

  return (
    <div className="w-11/12 mx-auto my-5 p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Manage Coupons
      </h2>

      {/* Add / Update Coupon Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mb-10">
        <input
          name="code"
          type="text"
          placeholder="Coupon Code"
          value={form.code}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-transparent border border-primary-content text-secondary-content"
        />
        <input
          name="description"
          type="text"
          placeholder="Coupon Description"
          value={form.description}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-transparent border border-primary-content text-secondary-content"
        />
        <input
          name="discount"
          type="number"
          step="0.01"
          placeholder="Discount (e.g. 0.5 for 50%)"
          value={form.discount}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-transparent border border-primary-content text-secondary-content"
        />
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
          className="input input-bordered w-full bg-transparent border border-primary-content text-secondary-content"
        />
        <button
          type="submit"
          className="btn col-span-2 bg-primary hover:bg-secondary text-secondary-content font-semibold"
        >
          {editingId ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>

      {/* Show Coupons */}
      <div className="overflow-x-auto">
        <table className="table w-full text-secondary-content border border-primary">
          <thead className="bg-cyan-600 text-secondary-content">
            <tr>
              <th>No.</th>
              <th>Code</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr
                key={coupon._id}
                className="hover:bg-cyan-800/20 border-b border-primary"
              >
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.description?.slice(0, 25)}...</td>
                <td>{coupon.discount * 100}%</td>
                <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
