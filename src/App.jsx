import "./App.css";
import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./Components/NavBar";

// Lazy load pages for code splitting
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Projects = lazy(() => import("./Pages/Projects"));
const Skills = lazy(() => import("./Pages/Skills"));
const Education = lazy(() => import("./Pages/Education"));
const Contact = lazy(() => import("./Pages/Contact"));

// Loading fallback component - simplified for navbar context
const LoadingFallback = () => (
  <div
    style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff",
      position: "relative",
    }}
  >
    <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
      <h1
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
          margin: 0,
          color: "#fff",
          fontFamily: "sign, serif",
          animation:
            "fadeInOut 2s ease-in-out infinite, glow 2s ease-in-out infinite, pulse 2s ease-in-out infinite",
          letterSpacing: "2px",
          textShadow: "0 0 20px rgba(255, 255, 255, 1)",
        }}
      >
        Sarves
      </h1>

      <style>{`
        @font-face {
          font-family: sign;
          src: url("../assets/font/Mitchel-GO76G.otf") format("opentype");
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 30px rgba(255, 255, 255, 0.3);
          }
          50% { 
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                         0 0 50px rgba(255, 255, 255, 0.6),
                         0 0 80px rgba(255, 255, 255, 0.4);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  </div>
);

function App() {
  const [isOpenToWorkModalOpen, setIsOpenToWorkModalOpen] = useState(false);

  return (
    <>
      <NavBar onOpenToWorkClick={() => setIsOpenToWorkModalOpen(true)} />
      <Suspense fallback={<LoadingFallback />}>
        <Home />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </Suspense>

      {/* Open to Work Modal - Full Screen */}
      <AnimatePresence>
        {isOpenToWorkModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpenToWorkModalOpen(false)}
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
                onClick={() => setIsOpenToWorkModalOpen(false)}
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
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
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
