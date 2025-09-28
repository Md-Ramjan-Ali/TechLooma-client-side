import React, { useState } from "react";
import {
  Users,
  Code,
  Coffee,
  Heart,
  Lightbulb,
  Rocket,
  Play,
  Quote,
  MapPin,
  Calendar,
  Award,
  Github,
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BehindTheScenes = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former Product Manager at Google. Passionate about connecting innovators with their audience.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      location: "San Francisco, CA",
      joinDate: "Jan 2023",
      achievements: ["Forbes 30 Under 30", "Y Combinator Alumni"],
      social: {
        twitter: "@sarahchen",
        linkedin: "sarahchen",
        github: "sarahchen",
      },
      funFact: "Drinks 6 cups of coffee daily and still codes at midnight!",
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "CTO & Co-founder",
      bio: "Full-stack wizard with 10+ years experience. Built scalable systems for millions of users.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      location: "Austin, TX",
      joinDate: "Jan 2023",
      achievements: ["Tech Lead at Netflix", "Open Source Contributor"],
      social: {
        twitter: "@alexdev",
        linkedin: "alexrodriguez",
        github: "alexrod",
      },
      funFact: "Has a collection of 50+ mechanical keyboards!",
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Head of Design",
      bio: "UX/UI designer who believes great design should be invisible. Makes complex things simple.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      location: "London, UK",
      joinDate: "Mar 2023",
      achievements: ["Ex-Airbnb Designer", "Design Systems Expert"],
      social: {
        twitter: "@emmadesigns",
        linkedin: "emmawatson",
        github: "emmaw",
      },
      funFact: "Sketches UI ideas on napkins during lunch breaks!",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Head of Community",
      bio: "Community builder who loves connecting people. Turned our Discord from 10 to 10k members.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      location: "Seoul, South Korea",
      joinDate: "May 2023",
      achievements: ["Community Manager at Discord", "Speaker at DevCon"],
      social: {
        twitter: "@davidcommunity",
        linkedin: "davidkim",
        github: "davidk",
      },
      funFact: "Speaks 5 languages and still learning sign language!",
    },
  ];

  // Company journey milestones
  const milestones = [
    {
      date: "Jan 2023",
      title: "The Idea Spark",
      description:
        "Sarah and Alex met at a hackathon and realized the need for a better product discovery platform.",
      icon: Lightbulb,
      color: "bg-yellow-500",
    },
    {
      date: "Feb 2023",
      title: "First Lines of Code",
      description:
        "Started building the MVP in Alex's garage. Coffee consumption reached dangerous levels.",
      icon: Code,
      color: "bg-blue-500",
    },
    {
      date: "Apr 2023",
      title: "Team Grows",
      description:
        "Emma and David joined the team. Our design became beautiful and community started growing.",
      icon: Users,
      color: "bg-green-500",
    },
    {
      date: "Jun 2023",
      title: "Beta Launch",
      description:
        "Launched private beta with 100 early users. The feedback was incredible!",
      icon: Rocket,
      color: "bg-purple-500",
    },
    {
      date: "Aug 2023",
      title: "Public Launch",
      description:
        "TechLooma went live! 1000+ products submitted in the first week.",
      icon: Award,
      color: "bg-pink-500",
    },
    {
      date: "Present",
      title: "Growing Strong",
      description:
        "10,000+ users, 5,000+ products, and the best community of makers and innovators.",
      icon: Heart,
      color: "bg-red-500",
    },
  ];

  // Team testimonials/quotes
  const testimonials = [
    {
      quote:
        "Building TechLooma has been the most rewarding challenge of my career. Every day, we help innovators share their creations with the world.",
      author: "Sarah Chen",
      role: "Founder & CEO",
    },
    {
      quote:
        "The technical challenges keep me excited. We're not just building a platform; we're crafting an experience that scales with our community.",
      author: "Alex Rodriguez",
      role: "CTO & Co-founder",
    },
    {
      quote:
        "Great design is about empathy. Every pixel we place helps someone discover their next favorite tool or app.",
      author: "Emma Watson",
      role: "Head of Design",
    },
    {
      quote:
        "Our community is our superpower. The connections and collaborations happening on TechLooma inspire me every single day.",
      author: "David Kim",
      role: "Head of Community",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2  backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>Meet the Team</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-content mb-4">
            Behind the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              Scenes
            </span>
          </h2>
          <p className="text-xl text-secondary-content max-w-3xl mx-auto">
            Meet the passionate team building TechLooma and discover the journey
            of how we're revolutionizing product discovery.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className=" p-2  backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
            <div className="flex flex-col sm:flex-row space-x-1">
              <button
                onClick={() => setActiveTab("team")}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all cursor-pointer ${
                  activeTab === "team"
                    ? "bg-secondary text-secondary-content shadow-md"
                    : "text-secondary-content hover:text-secondary-content hover:bg-secondary"
                }`}
              >
                Our Team
              </button>
              <button
                onClick={() => setActiveTab("journey")}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all cursor-pointer ${
                  activeTab === "journey"
                    ? "bg-secondary text-secondary-content shadow-md"
                    : "text-secondary-content hover:text-secondary-content hover:bg-secondary"
                }`}
              >
                Our Journey
              </button>
              <button
                onClick={() => setActiveTab("culture")}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all cursor-pointer ${
                  activeTab === "culture"
                    ? "bg-secondary text-secondary-content shadow-md"
                    : "text-secondary-content hover:text-secondary-content hover:bg-secondary"
                }`}
              >
                Our Culture
              </button>
            </div>
          </div>
        </div>

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-12">
            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="group">
                  <div className=" p-6  backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:-translate-y-2 cursor-pointer">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary group-hover:ring-secondary transition-all"
                      />
                      <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2">
                        <div className="bg-secondary text-secondary-content p-2 rounded-full shadow-lg">
                          <Heart className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-secondary-content mb-1">
                        {member.name}
                      </h3>
                      <p className="text-secondary-content font-medium text-sm mb-3">
                        {member.role}
                      </p>
                      <p className="text-secondary-content text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-sm text-secondary-content">
                        <MapPin className="w-4 h-4" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-secondary-content">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {member.joinDate}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <div className="text-xs text-secondary-content mb-2 text-center">
                        Achievements
                      </div>
                      <div className="space-y-1">
                        {member.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="bg-secondary rounded-lg px-3 py-2 text-xs text-center text-secondary-content"
                          >
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fun Fact */}
                    <div className=" backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content p-3 mb-4">
                      <p className="text-xs text-center italic">
                        {member.funFact}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Journey Tab */}
        {activeTab === "journey" && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const IconComponent = milestone.icon;
                  return (
                    <div
                      key={index}
                      className="relative flex items-start space-x-6"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center shadow-lg z-10`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-secondary text-secondary-content px-3 py-1 rounded-full text-sm font-medium">
                            {milestone.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-secondary-content mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-secondary-content leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Culture Tab */}
        {activeTab === "culture" && (
          <div className="space-y-12">
            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className=" p-8 text-center backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation First</h3>
                <p className="">
                  We're always pushing boundaries and exploring new ways to help
                  creators share their work.
                </p>
              </div>

              <div className="p-8 text-center backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:shadow-xl transition-all duration-300">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold  mb-3">Community Love</h3>
                <p className="">
                  Our community is at the heart of everything we do. Their
                  success is our success.
                </p>
              </div>

              <div className="p-8 text-center backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:shadow-xl transition-all duration-300">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Work-Life Balance</h3>
                <p className="">
                  We believe great work comes from happy, well-rested minds.
                  Remote-first and flexible hours.
                </p>
              </div>
            </div>

            {/* Team Testimonials Slider */}
            <div className="p-8 text-center backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold  mb-2">
                  What Our Team Says
                </h3>
                <p className="">
                  Hear directly from the people building TechLooma
                </p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="p-8 text-center backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl text-secondary-content hover:shadow-xl transition-all duration-300">
                  <Quote className="w-8 h-8 mb-4" />
                  <blockquote className="text-lg leading-relaxed mb-6 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
                    <div>
                      <cite className=" font-semibold not-italic">
                        {testimonials[currentTestimonial].author}
                      </cite>
                      <p className=" text-sm">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={prevTestimonial}
                        className="p-2 rounded-full bg-secondary cursor-pointer text-secondary-content transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="p-2 rounded-full bg-secondary cursor-pointer text-secondary-content transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Testimonial dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial
                          ? "bg-secondary"
                          : "bg-secondary-content"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Fun Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center text-secondary-content">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  24☕
                </div>
                <div className="text-sm">Cups of coffee per day</div>
              </div>
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center text-secondary-content">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  1,000+
                </div>
                <div className="text-sm">Lines of code daily</div>
              </div>
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center text-secondary-content">
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <div className="text-sm ">Countries represented</div>
              </div>
              <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-6 text-center text-secondary-content">
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  100%
                </div>
                <div className="text-sm ">Remote-first culture</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BehindTheScenes;
