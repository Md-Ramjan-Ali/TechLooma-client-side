import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../Components/Loading/Loading';
import useUserInfo from '../../../hooks/useUserInfo';
import welcomeMessage from '../../../assets/Loties/Welcome Animation.json'
import Lottie from 'lottie-react';

const Dashboard = () => {
  const { role, isLoading } = useUserRole(); 
  const { userInfo, loading } = useUserInfo();

  if(loading || isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="relative text-center w-10/12 mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl my-5 text-secondary-content min-h-[calc(100vh-20px-30px)] flex flex-col justify-center items-center">
      {role === "admin" && (
        <>
          <h1 className="text-3xl font-bold capitalize">
            Welcome back,{" "}
            <span className="text-secondary">{userInfo.name}</span>
          </h1>
          <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium">
            Admin Panel
          </span>
        </>
      )}
      {role === "moderator" && (
        <>
          <h1 className="text-3xl font-bold capitalize  ">
            Welcome back,{" "}
            <span className="text-secondary">{userInfo.name}</span>
          </h1>
          <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium">
            Moderator Panel
          </span>
        </>
      )}
      {role === "user" && (
        <>
          <h1 className="text-3xl font-bold capitalize ">
            Welcome back,{" "}
            <span className="text-secondary">{userInfo.name}</span>
          </h1>
          <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium">
            User Panel
          </span>
        </>
      )}
      <div className="flex justify-center items-center">
        <Lottie
          className="w-96"
          animationData={welcomeMessage}
          loop={true}
        ></Lottie>
      </div>
      <p>
        Explore your personalized dashboard and stay updated with the latest
        features.
      </p>
    </div>
  );
};

export default Dashboard;