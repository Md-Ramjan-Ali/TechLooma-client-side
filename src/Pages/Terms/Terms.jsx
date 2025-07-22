import React from "react";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div>
      <Helmet>
        <title>Terms | TechLooma</title>
      </Helmet>
      <div className="w-10/12 mx-auto py-10 text-secondary-content">
        <h2 className="text-3xl font-bold text-secondary mb-4 text-center md:text-left">
          Terms and Conditions
        </h2>
        <p className="text-lg mb-6">
          Welcome to Event Explore. By accessing or using our website, you agree
          to be bound by these terms. Please read them carefully.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>You must be at least 13 years old to use our platform.</li>
          <li>
            All content and materials on this platform are protected by
            copyright laws.
          </li>
          <li>
            You may not use the website for any illegal or unauthorized purpose.
          </li>
          <li>
            We reserve the right to terminate access to any user who violates
            these terms.
          </li>
          <li>
            All event details are for informational purposes only. We are not
            responsible for any inaccuracies or changes.
          </li>
        </ul>
        <p className="mt-6 text-base">
          If you have any questions about our terms, feel free to contact us.
        </p>
      </div>
    </div>
  );
};

export default Terms;
