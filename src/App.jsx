"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./Components/NavBar";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import { initializeSecurity } from "./utils/security.js";

function App() {
  const [isOpenToWorkModalOpen, setIsOpenToWorkModalOpen] = useState(false);

  useEffect(() => {
    initializeSecurity();
  }, []);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleOpenToWorkClick = useCallback(() => {
    setIsOpenToWorkModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpenToWorkModalOpen(false);
  }, []);

  return (
    <>
      <NavBar onOpenToWorkClick={handleOpenToWorkClick} />
      <Home />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />

      {/* Open to Work Modal - Full Screen */}
      <AnimatePresence>
        {isOpenToWorkModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleModalClose}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={handleModalClose}
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="modal-header">
                <h2>Open to Work</h2>
              </div>
              <div className="modal-body">
                <div className="modal-section">
                  <h3>Roles Interested In</h3>
                  <p>
                    Frontend Developer / Software Development Engineer (SDE)
                  </p>
                </div>
                <div className="modal-section">
                  <h3>Experience Level</h3>
                  <p>Fresher / Intern</p>
                </div>
                <div className="modal-section">
                  <h3>Contact</h3>
                  <p>
                    <a href="mailto:sarveswaranmg@gmail.com">
                      sarveswaranmg@gmail.com
                    </a>
                  </p>
                </div>
                <motion.a
                  href="/Sarveswaran-MG-Software-Developer.pdf"
                  download
                  className="modal-resume-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Download Resume</span>
                  <span className="resume-icon">↓</span>
                </motion.a>
                <motion.a
                  href="https://flowcv.com/resume/calokm6e5b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-resume-button modal-view-resume-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View on FlowCV</span>
                  <span className="resume-icon">→</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
