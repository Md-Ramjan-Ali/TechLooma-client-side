import React from "react";
import { Link } from "react-router";
import error from "../../assets/Loties/Lonely 404.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Error Page | TechLooma</title>
      </Helmet>

      <section className="flex items-center min-h-screen w-full p-16 bg-base-content text-secondary-content">
        <div className="flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <Lottie
                className="max-w-xl drop-shadow-xl drop-shadow-red-600"
                animationData={error}
                loop={true}
              ></Lottie>
            </div>
            <p className="text-2xl font-semibold md:text-3xl text-red-500">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to="/"
              rel="noopener noreferrer"
              href="#"
              className="btn bg-secondary hover:bg-primary text-secondary-content font-semibold rounded border-0"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
