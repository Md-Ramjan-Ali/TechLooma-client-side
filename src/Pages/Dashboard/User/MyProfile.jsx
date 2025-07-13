import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import SubscribeModal from "./SubscribeModal";
import Loading from "../../../Components/Loading/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const { userInfo, isLoading, loading } = useUserInfo();
  const [showModal, setShowModal] = useState(false);
 

  if (loading || isLoading) return <Loading></Loading>

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-content/70 text-secondary-content rounded-2xl shadow-lg my-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full border-2 border-primary"
        />
        <p>
          <strong>Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        {userInfo?.subscribed ? (
          <p className="bg-green-500 text-white px-4 py-1 rounded-full mt-2">
            Status: Verified Member
          </p>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary mt-4 text-black"
          >
            Subscribe - $9.99
          </button>
        )}
      </div>

      {showModal && <SubscribeModal setShowModal={setShowModal} user={user} />}
    </div>
  );
};

export default MyProfile;
