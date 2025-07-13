import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      setLoading(false);
      return res.data;
    },
  });

  const handleMakeRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User promoted to ${role}`, "success");
        refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-11/12 mx-auto my-5 p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-secondary-content border border-primary">
          <thead className="bg-secondary text-secondary-content">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-cyan-800/20 border-b border-primary/40"
              >
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  <button
                    onClick={() => handleMakeRole(user._id, "moderator")}
                    className="btn btn-xs bg-primary text-secondary-content hover:bg-secondary disabled:opacity-60"
                    disabled={user.role === "moderator"}
                  >
                    Moderator
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeRole(user._id, "admin")}
                    className="btn btn-xs bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
                    disabled={user.role === "admin"}
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
