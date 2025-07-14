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
    <div className="max-w-xl mx-auto p-6 my-10">
      <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl py-5 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">
          My Profile
        </h2>

        <div className="flex flex-col items-center gap-4">
          <img
            src={user?.photoURL}
            alt="User"
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full border-2 border-primary "
          />
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>
      <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl w-full">
        {userInfo?.subscribed ? (
          <div className="py-5">
            <p className="bg-green-500 text-white px-4 py-1 rounded-full mt-2 w-fit mx-auto">
              Status: Verified Member
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 py-5">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary mt-4 text-black"
            >
              Subscribe - $9.99
            </button>
            <p className="text-sm text-gray-400">
              Get unlimited product access
            </p>
          </div>
        )}
      </div>

      {showModal && <SubscribeModal setShowModal={setShowModal} user={user} />}
    </div>
  );
};

export default MyProfile;
