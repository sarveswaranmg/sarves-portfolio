import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import profileImgWebP from "../assets/final-optimized.webp";
import profileImgPNG from "../assets/final-optimized.png";
import "./Home.css";
import Space from "../Components/Space";

function Home() {
  const roles = ["Software Developer.", "ML Engineer.", "FrontEnd Developer."];
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0.1 : 0.2,
          delayChildren: prefersReducedMotion ? 0.1 : 0.2,
        },
      },
    }),
    [prefersReducedMotion],
  );

  const imageVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: prefersReducedMotion ? 0.2 : 0.6, // optimized from 0.3/0.8
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion],
  );

  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.2 : 0.6, // optimized from 0.3/0.8
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion],
  );

  const nameCharVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * (prefersReducedMotion ? 0.02 : 0.04), // optimized from 0.05
          duration: prefersReducedMotion ? 0.15 : 0.4, // optimized from 0.2/0.5
        },
      }),
    }),
    [prefersReducedMotion],
  );

  const floatingAnimation = prefersReducedMotion
    ? { y: 0 }
    : { y: [0, -20, 0] };
  const floatingTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 6, repeat: Infinity, ease: "easeInOut" };

  const glowVariants = useMemo(
    () => ({
      rest: { textShadow: "0 0 20px rgba(255, 255, 255, 0.15)" },
      hover: prefersReducedMotion
        ? { textShadow: "0 0 20px rgba(255, 255, 255, 0.15)" }
        : { textShadow: "0 0 30px rgba(210, 183, 145, 0.5)" },
    }),
    [prefersReducedMotion],
  );

  return (
    <motion.div
      id="home"
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ contain: "layout" }}
    >
      <Space />

      <motion.div
        className="img-container"
        variants={imageVariants}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <picture>
          <source srcSet={profileImgWebP} type="image/webp" />
          <img
            className="home-image"
            src={profileImgPNG}
            alt="profile"
            loading="eager"
            decoding="async"
            style={{
              animation: prefersReducedMotion
                ? "none"
                : "float 6s ease-in-out infinite",
            }}
          />
        </picture>
      </motion.div>

      <motion.div className="home-text" variants={textVariants}>
        <motion.p
          className="name"
          variants={glowVariants}
          initial="rest"
          whileHover="hover"
        >
          {"I am Sarveswaran,".split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={nameCharVariants}
              initial="hidden"
              animate="visible"
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          className="role"
          variants={textVariants}
          whileHover={
            prefersReducedMotion
              ? {}
              : { textShadow: "0 0 20px rgba(210, 183, 145, 0.4)" }
          }
        >
          <ReactTyped
            strings={roles}
            typeSpeed={prefersReducedMotion ? 20 : 100}
            backSpeed={prefersReducedMotion ? 10 : 50}
            backDelay={2000}
            loop
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
