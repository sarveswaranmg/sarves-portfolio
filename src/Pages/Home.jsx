import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import profileImg from "../assets/final.png";
import "./Home.css";
import Space from "../Components/Space";

function Home() {
  const roles = ["Software Developer.", "ML Engineer.", "Web Designer."];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const nameCharVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Space />

      <motion.div
        className="img-container"
        variants={imageVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          className="home-image"
          src={profileImg}
          alt="profile"
          variants={imageVariants}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div className="home-text" variants={textVariants}>
        <motion.p className="name" variants={textVariants}>
          {"I am Sarveswaran,".split("").map((char, i) => (
            <motion.span key={i} custom={i} variants={nameCharVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          className="role"
          variants={textVariants}
          whileHover={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
        >
          <ReactTyped
            strings={roles}
            typeSpeed={100}
            backSpeed={50}
            backDelay={2000}
            loop
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
