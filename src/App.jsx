import "./App.css";
import { lazy, Suspense } from "react";
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
  return (
    <>
      <NavBar />
      <Suspense fallback={<LoadingFallback />}>
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </>
  );
}

export default App;
