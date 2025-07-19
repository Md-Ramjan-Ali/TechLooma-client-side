import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import bannerImage from "../../assets/bannerImage.png";

const Banner = () => {
  return (
    <section className=" w-full h-[80vh]  bg-[#071B2E] text-secondary-content">
      <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between pt-20">
        {/* Left side - Title Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="bg-secondary rounded-tl-2xl rounded-br-2xl text-secondary-content font-semibold px-3 py-1 mb-4 inline-block">
            Tech Startup
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug mt-4">
            Leading The Charge <br /> Into The Future Of <br /> Technology.
          </h1>
        </motion.div>

        {/* Right side - Description & Features */}
        <motion.div
          className="w-[550px] drop-shadow-lg"
          animate={{
            y: [0, -30, 0], // Up, then down
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img className="w-full object-cover" src={bannerImage} alt="Banner" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
