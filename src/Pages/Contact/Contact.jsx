import React from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const handleMessage = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
  };
  return (
    <div className="w-10/12 mx-auto py-5 text-secondary-content">
      <Helmet>
        <title>Contact | TechLooma</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Get in Touch with TechLooma
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-8">
        We'd love to hear from you! Whether you have questions about our
        platform, want to suggest a feature, or need assistance — reach out and
        our team will get back to you as soon as possible. Your feedback helps
        us make TechLooma better for everyone.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleMessage} className="space-y-6">
        <div>
          <label className="text-[.885rem] font-semibold ">Full name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:border-secondary"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="text-[.885rem] font-semibold ">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:border-secondary"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="text-[.885rem] font-semibold ">Message</label>
          <textarea
            rows="4"
            name="message"
            className="w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:border-secondary"
            placeholder="Your message..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary dark:bg-transparent border text-white font-semibold py-3 rounded-md hover:bg-secondary transition"
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};

export default Contact;
