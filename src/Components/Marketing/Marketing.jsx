import React from 'react';
// import image from '../../assets/markating.png'
import lottie from '../../assets/Loties/marketing.json'
import Lottie from 'lottie-react';

const Marketing = () => {
  return (
    <div className="-mt-44 w-10/12 mx-auto flex justify-center p-6 sm:p-8 md:p-10 bg-base-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
      {/* <img src={image} alt="Marketing image" /> */}
      <Lottie className=" w-96" animationData={lottie} loop={true}></Lottie>
    </div>
  );
};

export default Marketing;