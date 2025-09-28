import React, { useState } from "react";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 text-secondary-content">
          <div className="inline-flex items-center space-x-2 px-4 py-2 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content text-sm font-medium mb-4 ">
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              TechLooma
            </span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have questions about our
            platform, want to suggest a feature, or need assistance — reach out
            and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto text-secondary-content">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8">
                Ready to help you discover and share amazing tech products.
                Let's connect!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 text-secondary-content">
              <div className=" p-6 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="overflow-x-scroll">
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="">ramjanbd1999@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="overflow-x-scroll">
                    <h4 className="font-semibold ">Call Us</h4>
                    <p className="">+8801928-294516</p>
                  </div>
                </div>
              </div>

              <div className="p-6 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="overflow-x-scroll">
                    <h4 className="font-semibold ">Visit Us</h4>
                    <p className="">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="p-6 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="overflow-x-scroll">
                    <h4 className="font-semibold">Response Time</h4>
                    <p className="">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-secondary-content">
              <h4 className="font-bold text-lg mb-4">Why Contact Us?</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm opacity-90">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5K+</div>
                  <div className="text-sm opacity-90">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                <p className="">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-900">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-green-700 text-sm">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-900">
                      Message Failed to Send
                    </h4>
                    <p className="text-red-700 text-sm">
                      Something went wrong. Please try again later.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 " />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full  pl-12 bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <textarea
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pl-12 bg-transparent text-secondary-content border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleMessage}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-secondary-content font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-primary/30 ">
                <p className="text-sm text-center">
                  By submitting this form, you agree to our{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto text-secondary-content">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Frequently Asked Questions
            </h3>
            <p className="">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6">
              <h4 className="font-semibold mb-2">
                How quickly do you respond?
              </h4>
              <p className=" text-sm">
                We typically respond within 24 hours during business days.
              </p>
            </div>
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6">
              <h4 className="font-semibold  mb-2">
                Can I suggest new features?
              </h4>
              <p className=" text-sm">
                Absolutely! We love hearing feature suggestions from our
                community.
              </p>
            </div>
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6">
              <h4 className="font-semibold  mb-2">
                Is there phone support available?
              </h4>
              <p className=" text-sm">
                Yes, we offer phone support for premium users and urgent issues.
              </p>
            </div>
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6">
              <h4 className="font-semibold  mb-2">
                Do you offer technical support?
              </h4>
              <p className=" text-sm">
                Yes, our technical team can help with platform-related
                questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
