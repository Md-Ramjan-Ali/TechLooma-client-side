import React from "react";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <div>
      <Helmet>
        <title>Privacy | TechLooma</title>
      </Helmet>
      <div className="w-10/12 mx-auto py-20 lg:px-0 text-secondary-content">
        <h2 className="text-3xl font-bold text-primary mb-4 text-center md:text-left">
          Privacy Policy
        </h2>
        <p className="text-lg mb-6">
          At TechLooma, your privacy is a top priority. This Privacy Policy
          explains how we collect, use, and safeguard your information when you
          interact with our platform.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            We collect basic information such as name, email address, and
            profile image when you register or sign in using social
            authentication providers.
          </li>
          <li>
            All user data is securely stored using Firebase Authentication and
            access-controlled backend services.
          </li>
          <li>
            TechLooma does not sell, rent, or share your personal information
            with third parties without your consent.
          </li>
          <li>
            We may collect technical data (like device info, IP address, and
            browsing behavior) for analytics and platform improvement using
            tools like Google Analytics.
          </li>
          <li>
            Cookies and local storage are used to enhance user experience,
            remember login status, and improve page performance.
          </li>
          <li>
            Users can manage or delete their account and associated data at any
            time by contacting support or using account settings.
          </li>
        </ul>
        <p className="mt-6 text-base">
          If you have questions or concerns about your privacy, please reach out
          to our support team at{" "}
          <a
            href="mailto:support@techlooma.com"
            className="text-blue-500 underline"
          >
            support@techlooma.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Privacy;
