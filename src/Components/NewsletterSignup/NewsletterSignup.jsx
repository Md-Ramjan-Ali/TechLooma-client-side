import React, { useState } from "react";
import { Mail, Check, X, Send, Sparkles, Bell, TrendingUp } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubscribed(false);
    setError("");
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm border border-purple-500/30">
              <Sparkles className="w-4 h-4" />
              <span>Stay Updated</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Never Miss the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Next Big{" "}
              </span>
              Tech Product
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get weekly insights on trending tech products, exclusive launches,
              and insider tips from the TechLooma community. Join 50,000+ makers
              and innovators.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Weekly product roundups</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Exclusive early access</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Industry insights</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Maker interviews</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:flex lg:justify-center">
            <div className="w-full max-w-md">
              {!isSubscribed ? (
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-3 md:p-8 border border-white/20 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Subscribe Now
                    </h3>
                    <p className="text-gray-300">
                      Join thousands of tech enthusiasts
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        disabled={isLoading}
                      />
                      <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    {error && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm">
                        <X className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Subscribe for Free</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Bell className="w-4 h-4" />
                      <span>No spam</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Weekly updates</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Success State
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-3 md:p-8 border border-green-500/30 shadow-2xl text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    You're All Set! 🎉
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Welcome to the TechLooma community! Check your email for a
                    confirmation message.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300"
                  >
                    Subscribe another email →
                  </button>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="text-sm md:text-2xl font-bold text-white">
                    50K+
                  </div>
                  <div className="text-sm text-gray-400 overflow-hidden">Subscribers</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="text-sm md:text-2xl font-bold text-white">
                    98%
                  </div>
                  <div className="text-sm text-gray-400">Open Rate</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="text-sm md:text-2xl font-bold text-white">
                    Weekly
                  </div>
                  <div className="text-sm text-gray-400">Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
