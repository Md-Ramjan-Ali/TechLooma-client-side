import React, { useState } from "react";
import { Search, Star, Rocket, Users, Shield } from "lucide-react";

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Discover Innovation",
      description:
        "Explore cutting-edge tech products from diverse categories and stay ahead of the curve.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Honest Reviews",
      description:
        "Read and write authentic reviews to help the community make informed decisions.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Product Submissions",
      description:
        "Submit your own products and gain exposure to our tech-savvy audience.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tech Community",
      description:
        "Connect with passionate tech enthusiasts and industry professionals.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description:
        "Enjoy a modern, secure, and user-friendly platform built for tech discovery.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative w-10/12 mx-auto py-20 text-center">
          <div className=" px-4 py-2 bg-base-content rounded-full text-sm font-medium mb-6 backdrop-blur-sm flex items-center gap-2 w-fit mx-auto">
            <Rocket className="w-4 h-4" />
            Empowering Tech Discovery
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            About TechLooma
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Your gateway to discovering, reviewing, and sharing the latest tech
            innovations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto py-16 space-y-16 text-secondary-content px-4 xl:px-0">
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-secondary text-secondary-content rounded-full text-sm font-medium">
              Our Mission
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Connecting You with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {" "}
                Innovation
              </span>
            </h2>
            <p className="text-lg leading-relaxed">
              <strong className="text-secondary">TechLooma</strong> is your
              trusted platform for discovering, reviewing, and sharing the
              latest tech products and innovations. We bridge the gap between
              cutting-edge technology and the people who need it most.
            </p>
            <p className="leading-relaxed">
              Whether you're a developer seeking the perfect tool, an
              entrepreneur looking for the next big solution, or a tech
              enthusiast staying ahead of trends — TechLooma connects you with
              the innovations that matter.
            </p>
          </div>

          <div className="relative text-secondary-content">
            <div className="p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl ">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-4">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm">Tech Products</div>
                </div>
                <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-4 ">
                  <div className="text-2xl font-bold text-secondary">25K+</div>
                  <div className="text-sm">Reviews</div>
                </div>
                <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-4 ">
                  <div className="text-2xl font-bold text-green-600">5K+</div>
                  <div className="text-sm">Contributors</div>
                </div>
                <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-4 ">
                  <div className="text-2xl font-bold text-orange-600">50+</div>
                  <div className="text-sm">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className=" p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-center text-secondary-content">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-block px-3 py-1 bg-secondary text-secondary-content rounded-full text-sm font-medium">
              Our Vision
            </div>
            <h3 className="text-3xl md:text-4xl font-bold ">
              Technology That Transforms Lives
            </h3>
            <p className="text-lg leading-relaxed">
              At TechLooma, we believe technology should be accessible,
              transparent, and transformative. Our mission is to create a
              user-driven ecosystem where innovation meets real-world needs,
              helping you discover tech products that genuinely elevate your
              workflow and lifestyle.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-12 text-secondary-content">
          <div className="text-center space-y-4">
            <div className="inline-block px-3 py-1 bg-secondary text-secondary-content rounded-full text-sm font-medium">
              Why Choose TechLooma?
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              Everything You Need in One Platform
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group  p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl transition-all duration-300 cursor-pointer ${
                  hoveredCard === index
                    ? "transform -translate-y-2"
                    : "border-transparent"
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-secondary mb-4 transform group-hover:scale-105 transition-transform duration-300 group-hover:text-purple-600">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h4>
                <p className="leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className=" p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-center text-secondary-content">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to Explore the Future of Tech?
            </h3>
            <p className="text-lg opacity-90">
              Join thousands of tech enthusiasts, developers, and innovators who
              trust TechLooma to discover the tools that shape tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="bg-secondary text-secondary-content px-8 py-3 rounded-full font-semibold transition-colors transform hover:scale-105 cursor-pointer">
                Start Exploring
              </button>
              <button className="border-2 px-8 py-3 rounded-full font-semibold hover:bg-secondary hover:text-secondary-content cursor-pointer transition-all transform hover:scale-105">
                Submit Your Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
