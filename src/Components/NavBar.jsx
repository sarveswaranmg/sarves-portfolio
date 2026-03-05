"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css";

const MobileNavItem = React.memo(
  ({
    section,
    i,
    isMobileMenuOpen,
    onScroll,
    mobileItemVariants,
    isActive,
  }) => (
    <motion.div
      className={`mobile-nav-item ${isActive ? "active" : ""}`}
      onClick={() => onScroll(section)}
      variants={mobileItemVariants}
      custom={i}
      animate={isMobileMenuOpen ? "open" : "closed"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onScroll(section);
      }}
    >
      <span>{section}</span>
    </motion.div>
  ),
);

MobileNavItem.displayName = "MobileNavItem";

function NavBar({ onOpenToWorkClick }) {
  const sections = useMemo(
    () => ["Home", "About", "Projects", "Skills", "Education", "Contact"],
    [],
  );

  // Initialize with Home to match server render
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef(null);

  // Detect active section on mount and scroll
  useEffect(() => {
    let ticking = false;

    const getSectionInView = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.toLowerCase());

        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            return section;
          }
        }
      }

      // Default to Home if nothing matches
      return "Home";
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentSection = getSectionInView();
          setActiveSection(currentSection);
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set mounted flag on initial mount (after hydration)
    setMounted(true);

    // Detect initial section
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  // Close mobile menu on outside click or scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("click", handleOutsideClick, true);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      const navHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  }, []);

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
      textShadow: "0 0 20px rgba(210, 183, 145, 0)",
    },
    hover: {
      textShadow:
        "0 0 30px rgba(210, 183, 145, 0.6), 0 0 60px rgba(210, 183, 145, 0.3)",
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
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    active: {
      color: "#d2b791",
      scale: 1.08,
      textShadow: "0 0 20px rgba(210, 183, 145, 0.6)",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hover: {
      color: "#d2b791",
      y: -2,
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
    open: {
      rotate: 90,
      transition: { duration: 0.3 },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.nav
      ref={navRef}
      className={`nav-container ${isScrolled ? "scrolled" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Main navigation"
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

      {/* Navigation Links - Desktop */}
      <motion.nav
        className="nav-bar"
        variants={itemVariants}
        aria-label="Desktop navigation"
      >
        {sections.map((section) => (
          <motion.button
            key={section}
            className="nav-item"
            onClick={() => scrollToSection(section)}
            variants={navItemVariants}
            initial="rest"
            animate={activeSection === section ? "active" : "rest"}
            whileHover="hover"
            aria-label={`Navigate to ${section}`}
            aria-current={
              mounted && activeSection === section ? "page" : undefined
            }
          >
            <span>{section}</span>
            {mounted && activeSection === section && (
              <motion.div
                className="underline"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 380, damping: 40 }}
                aria-hidden="true"
              />
            )}
          </motion.button>
        ))}
      </motion.nav>

      {/* Hamburger Menu - Mobile */}
      <motion.button
        className="hamburger-menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        variants={hamburgerVariants}
        animate={isMobileMenuOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {sections.map((section, i) => (
              <MobileNavItem
                key={section}
                section={section}
                i={i}
                isMobileMenuOpen={isMobileMenuOpen}
                onScroll={scrollToSection}
                mobileItemVariants={mobileItemVariants}
                isActive={activeSection === section}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Card - Desktop Only */}
      <motion.button
        variants={itemVariants}
        className="glass-card"
        onClick={onOpenToWorkClick}
        aria-label="Open to work - Click for more information"
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="status-dot"
        />
        <span>Open to work</span>
      </motion.button>
    </motion.nav>
  );
}

export default NavBar;
