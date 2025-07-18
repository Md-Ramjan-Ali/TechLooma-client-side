import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <section className=" w-full h-[80vh]  bg-[#071B2E] text-white">
      <div className="w-10/12 mx-auto grid justify-between items-center md:grid-cols-2 gap-10 pt-20">
        {/* Left side - Title Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded mb-4 inline-block">
            Tech Startup
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug mt-4">
            Leading The Charge <br /> Into The Future Of <br /> Technology.
          </h1>
        </motion.div>

        {/* Right side - Description & Features */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-lg mx-auto"
        >
          <p className="text-gray-300 mb-6 text-lg">
            Tech Startup focuses on pioneering innovative technological
            solutions to address modern challenges.
          </p>
          <ul className="flex gap-5 items-center space-y-2 text-lg">
            <li className="flex items-center gap-2 text-green-400">
              <FaCheckCircle /> Eliminate Repetition
            </li>
            <li className="flex items-center gap-2 text-green-400">
              <FaCheckCircle /> Boost Efficiency
            </li>
          </ul>
          <button className="mt-6 bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300">
            Subscribe
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
