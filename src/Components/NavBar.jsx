import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "./NavBar.css";

function NavBar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = useMemo(
    () => ["Home", "About", "Projects", "Skills", "Education", "Contact"],
    [],
  );

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(
            entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1),
          );
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.toLowerCase());
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      const navHeight = 80; // navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const nameVariants = {
    rest: {
      textShadow: "0 0 20px rgba(255, 255, 255, 0)",
    },
    hover: {
      textShadow:
        "0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)",
    },
  };

  const letterVariants = {
    rest: { y: 0 },
    hover: (i) => ({
      y: [-5, 0],
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: "easeInOut",
        repeatType: "loop",
      },
    }),
  };

  const underlineVariants = {
    rest: { scaleX: 0, opacity: 0 },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const navItemVariants = {
    rest: {
      color: "rgba(255, 255, 255, 0.6)",
      scale: 1,
      textShadow: "none",
    },
    active: {
      color: "white",
      scale: 1.08,
      textShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
      transition: { duration: 0.3 },
    },
    hover: {
      color: "white",
      y: -2,
      scale: 1.1,
    },
  };

  return (
    <motion.div
      className={`nav-container ${isScrolled ? "scrolled" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="left-name-container">
        <motion.div className="left-name" initial="rest" whileHover="hover">
          <motion.div
            className="name-wrapper"
            variants={nameVariants}
            initial="rest"
            whileHover="hover"
          >
            {"Sarves".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="name-letter"
                variants={letterVariants}
                custom={i}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            className="name-underline"
            variants={underlineVariants}
            initial="rest"
            whileHover="hover"
          />
        </motion.div>
      </motion.div>

      {/* Navigation Links */}
      <motion.div className="nav-bar" variants={itemVariants}>
        {sections.map((section) => (
          <motion.div
            key={section}
            className="nav-item"
            onClick={() => scrollToSection(section)}
            variants={navItemVariants}
            initial="rest"
            animate={activeSection === section ? "active" : "rest"}
            whileHover="hover"
            style={{ cursor: "pointer" }}
          >
            <span>{section}</span>
            {activeSection === section && (
              <motion.div
                className="underline"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 380, damping: 40 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Status Card */}
      <motion.div variants={itemVariants} className="glass-card">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="status-dot"
        />
        <span>Open to work</span>
      </motion.div>
    </motion.div>
  );
}

export default NavBar;
