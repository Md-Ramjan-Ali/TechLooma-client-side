import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Bell,
  Star,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const UpcomingProducts = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState({});

  // Sample upcoming product launches data
  const upcomingLaunches = [
    {
      id: 1,
      name: "AI Code Assistant Pro",
      description:
        "Revolutionary AI-powered coding companion with 10x faster development",
      launchDate: new Date(2025, 8, 25), // September 25, 2025
      time: "10:00 AM PST",
      category: "AI Tools",
      maker: "TechCorp",
      makerImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      expectedVotes: "500+",
      tags: ["AI", "Developer Tools", "Productivity"],
      status: "confirmed",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "NextGen Photo Editor",
      description: "Professional photo editing with one-click AI enhancements",
      launchDate: new Date(2025, 8, 28), // September 28, 2025
      time: "2:00 PM EST",
      category: "Design Tools",
      maker: "Creative Labs",
      makerImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      expectedVotes: "300+",
      tags: ["Design", "AI", "Photography"],
      status: "confirmed",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Startup Analytics Dashboard",
      description: "Real-time analytics and insights for growing startups",
      launchDate: new Date(2025, 9, 2), // October 2, 2025
      time: "9:00 AM UTC",
      category: "Analytics",
      maker: "DataViz Inc",
      makerImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      expectedVotes: "400+",
      tags: ["Analytics", "Startup", "Business"],
      status: "tentative",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "VR Meeting Space",
      description:
        "Immersive virtual reality platform for remote team collaboration",
      launchDate: new Date(2025, 9, 5), // October 5, 2025
      time: "11:00 AM PST",
      category: "VR/AR",
      maker: "MetaWork",
      makerImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      expectedVotes: "600+",
      tags: ["VR", "Collaboration", "Remote Work"],
      status: "confirmed",
      image:
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Smart Home Controller",
      description: "Universal IoT device controller with AI automation",
      launchDate: new Date(2025, 9, 8), // October 8, 2025
      time: "3:00 PM CET",
      category: "IoT",
      maker: "SmartTech Solutions",
      makerImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      expectedVotes: "350+",
      tags: ["IoT", "Smart Home", "AI"],
      status: "confirmed",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
  ];

  const categories = [
    "all",
    "AI Tools",
    "Design Tools",
    "Analytics",
    "VR/AR",
    "IoT",
  ];

  const filteredLaunches = upcomingLaunches.filter(
    (launch) => filter === "all" || launch.category === filter
  );

  const toggleNotification = (productId) => {
    setNotifications((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isLaunchDate = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return upcomingLaunches.some(
      (launch) => launch.launchDate.toDateString() === date.toDateString()
    );
  };

  const getLaunchesForDate = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return upcomingLaunches.filter(
      (launch) => launch.launchDate.toDateString() === date.toDateString()
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="py-20 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            <span>Upcoming Launches</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-content mb-4">
            Product Launch
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              Calendar
            </span>
          </h2>
          <p className="text-xl text-secondary-content max-w-3xl mx-auto">
            Never miss the next big tech product. Get notified when innovative
            products launch and be among the first to discover them.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-content">
                  {monthYear}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-primary transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-secondary-content" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-primary transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-secondary-content" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-secondary-content"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={index} className="p-2"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const hasLaunch = isLaunchDate(day);
                  const launches = getLaunchesForDate(day);
                  console.log(launches);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`p-2 text-sm font-medium rounded-lg transition-all relative ${
                        hasLaunch
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                          : "text-secondary-content hover:bg-primary"
                      } ${selectedDate === day ? "ring-2 ring-blue-300" : ""}`}
                    >
                      {day}
                      {hasLaunch && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-base-content/60 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-primary/30">
                <div className="flex items-center space-x-2 text-sm text-secondary-content">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span>Launch Day</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {upcomingLaunches.length}
                </div>
                <div className="text-sm text-secondary-content">
                  Upcoming Launches
                </div>
              </div>
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Object.values(notifications).filter(Boolean).length}
                </div>
                <div className="text-sm text-secondary-content">
                  Your Notifications
                </div>
              </div>
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {
                    upcomingLaunches.filter((p) => p.status === "confirmed")
                      .length
                  }
                </div>
                <div className="text-sm text-secondary-content">
                  Confirmed Launches
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            {/* Filter */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-secondary-content" />
                <span className="text-sm font-medium text-secondary-content">
                  Filter by category:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filter === category
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-base-content/60 text-secondary-content hover:bg-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl"
                    }`}
                  >
                    {category === "all" ? "All Categories" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards */}
            <div className="space-y-4">
              {filteredLaunches.map((product) => (
                <div
                  key={product.id}
                  className="bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full lg:w-32 h-32 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-secondary-content mb-1">
                            {product.name}
                          </h3>
                          <p className="text-secondary-content text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.status === "confirmed"
                              ? "bg-secondary text-secondary-content"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {product.status}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-secondary-content rounded-md text-xs font-medium"
                          >
                            # {tag}
                          </span>
                        ))}
                      </div>

                      {/* Launch Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-secondary-content" />
                          <span className="text-sm text-secondary-content">
                            {formatDate(product.launchDate)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-secondary-content" />
                          <span className="text-sm text-secondary-content">
                            {product.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-secondary-content" />
                          <span className="text-sm text-secondary-content">
                            {product.expectedVotes} expected
                          </span>
                        </div>
                      </div>

                      {/* Maker Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={product.makerImage}
                          alt={product.maker}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-secondary-content">
                            by {product.maker}
                          </p>
                          <p className="text-xs text-secondary-content">
                            {product.category}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleNotification(product.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            notifications[product.id]
                              ? "bg-blue-500 text-white shadow-md"
                              : " backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:bg-primary"
                          }`}
                        >
                          <Bell
                            className={`w-4 h-4 ${
                              notifications[product.id] ? "fill-current" : ""
                            }`}
                          />
                          <span>
                            {notifications[product.id]
                              ? "Notified!"
                              : "Notify Me"}
                          </span>
                        </button>

                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProducts;
