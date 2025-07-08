import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <section
        className="flex items-center min-h-screen w-full p-16 dark:bg-gray-50 dark:text-gray-800"
        data-aos="zoom-in"
        data-aos-easing="linear"
      >
        <div className="flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-red-600 dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl text-secondary">
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
              className="btn bg-primary hover:bg-secondary text-white font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
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
