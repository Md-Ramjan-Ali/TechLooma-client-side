import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/about-image.png";



const AboutMe = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f0f0f] via-[#1f2937] to-[#0f0f0f] px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl">
        {/* Image */}
        <motion.img
          src={aboutImage}
          alt="Tech discussion"
          className="w-full max-w-md mx-auto object-contain"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Text content */}
        <motion.div
          className="text-white space-y-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-widest text-sm text-white/60">
            Who We Are
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Powering Product Discovery for the Next Generation
          </h1>
          <p className="italic text-white/80">
            At <span className="text-cyan-400 font-semibold">TechLooma</span>,
            we believe in celebrating innovation. Whether you're a developer,
            startup, or tech enthusiast — our platform brings the most exciting
            products to light.
          </p>
          <p className="text-white/90">
            From early-stage prototypes to full-fledged apps, explore a world of
            tools built to solve real problems. Upvote your favorites, leave
            feedback, and be part of the product evolution journey.
          </p>
          <button className="px-6 py-2 bg-primary text-secondary-content rounded-md hover:bg-secondary font-semibold shadow-md transition cursor-pointer flex items-center gap-2">
           
            Explore Products
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
