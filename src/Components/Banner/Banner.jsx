import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import bannerImage from "../../assets/bannerImage.png";
import bannerAnimation from "../../assets/Loties/Background looping animation.json";
import Lottie from "react-lottie-player";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#071B2E] text-secondary-content overflow-hidden">
      {/* Lottie background */}
      <Lottie
        loop
        play
        animationData={bannerAnimation}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative w-11/12 mx-auto flex flex-col md:flex-row gap-10 md:gap-5 justify-center md:justify-between items-center min-h-screen py-8 md:py-12">
        {/* Left side - Title Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="w-full md:w-1/2 z-10 space-y-4 md:space-y-6 text-center md:text-start"
        >
          {/* Badge */}
          <span className="bg-secondary rounded-tl-2xl rounded-br-2xl text-secondary-content font-semibold px-4 py-1 inline-block text-sm tracking-wide">
            Tech Startup
          </span>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight md:leading-snug">
            Leading The Charge Into The Future Of Technology.
          </h1>

          {/* Tagline */}
          <p className="text-base md:text-lg lg:text-xl text-primary font-semibold">
            Innovating Today for a Smarter Tomorrow
          </p>

          {/* CTA Button */}
          <Link to='/dashboard'>
            <button className="bg-secondary hover:bg-primary text-secondary-content font-bold py-3 px-6 rounded-tl-3xl rounded-br-3xl shadow-xl transition duration-300 cursor-pointer">
              Get Started
            </button>
          </Link>

          {/* Features */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
              <span className="text-sm md:text-base">Innovative Solutions</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
              <span className="text-sm md:text-base">Reliable & Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Right side - Description & Features */}
        <motion.div
          className="w-full md:w-1/2 drop-shadow-lg z-10"
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            className="w-full mx-auto object-cover"
            src={bannerImage}
            alt="Banner"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;