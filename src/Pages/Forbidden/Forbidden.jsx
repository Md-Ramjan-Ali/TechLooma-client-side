import { Link } from "react-router";
import forbidden from "../../assets/Loties/forbidden403.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-content text-center px-4">
      <Helmet>
        <title>Forbidden | TechLooma</title>
      </Helmet>

      <div className="flex justify-center items-center mb-4">
        <Lottie
          className="max-w-xl"
          animationData={forbidden}
          loop={true}
        ></Lottie>
      </div>
      <h1 className="text-4xl font-bold text-error">403 - Forbidden</h1>
      <p className="text-lg text-secondary-content mt-2 max-w-md">
        Sorry, you do not have permission to access this page. Please contact an
        administrator if you believe this is a mistake.
      </p>

      <Link to="/" className="mt-6">
        <button className="btn bg-secondary text-secondary-content border-0">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;
