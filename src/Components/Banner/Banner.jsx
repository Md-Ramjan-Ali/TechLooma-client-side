import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import bannerImage from "../../assets/bannerImage.png";
import bannerAnimation from "../../assets/Loties/Background looping animation.json";
import Lottie from "react-lottie-player";
import { Link } from "react-router";


const Banner = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[100vh] bg-[#071B2E] text-secondary-content overflow-hidden">
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

      <div className="relative w-11/12 mx-auto flex flex-col md:flex-row gap-5 justify-between items-center h-full py-3">
        {/* Left side - Title Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="w-full md:w-1/2 z-10 space-y-3 text-center md:text-start"
        >
          {/* Badge */}
          <span className="bg-secondary rounded-tl-2xl rounded-br-2xl text-secondary-content font-semibold px-4 py-1 inline-block text-sm tracking-wide">
            Tech Startup
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-extrabold leading-snug">
            Leading The Charge Into The Future Of Technology.
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-primary font-semibold">
            Innovating Today for a Smarter Tomorrow
          </p>

          {/* CTA Button */}
          <Link to='/dashboard'>
            <button className=" bg-secondary hover:bg-primary text-secondary-content font-bold py-3 px-6 rounded-tl-3xl rounded-br-3xl shadow-xl transition duration-300 cursor-pointer mb-2">
              Get Started
            </button>
          </Link>

          {/* Features */}
          <div className="flex justify-center lg:justify-start gap-3">
            <div className="flex items-center space-x-1">
              <FaCheckCircle className="text-green-400 text-lg" />
              <span>Innovative Solutions</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCheckCircle className="text-green-400 text-lg" />
              <span>Reliable & Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Right side - Description & Features */}
        <motion.div
          className="w-full md:w-1/2 drop-shadow-lg z-10 "
          animate={{
            y: [0, -30, 0], // Up, then down
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            className="w-4/5 md:w-full object-cover"
            src={bannerImage}
            alt="Banner"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
