import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./Skills.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import reactLogo from "../assets/logos/react.svg";
import jsLogo from "../assets/logos/javascript.svg";
import htmlLogo from "../assets/logos/html.svg";
import cssLogo from "../assets/logos/css.svg";
import tailwindLogo from "../assets/logos/tailwind-css.svg";
import nodeLogo from "../assets/logos/nodejs.svg";
import expressLogo from "../assets/logos/expressjs.svg";
import restApiLogo from "../assets/logos/rest-api.svg";
import mongodbLogo from "../assets/logos/mongodb.svg";
import sqlLogo from "../assets/logos/sql.svg";
import postgresqlLogo from "../assets/logos/postgresql.svg";
import javaLogo from "../assets/logos/java.svg";
import pythonLogo from "../assets/logos/python.svg";
import numpyLogo from "../assets/logos/numpy.svg";
import pandasLogo from "../assets/logos/pandas.svg";
import tensorflowLogo from "../assets/logos/tensorflow.svg";
import tableauLogo from "../assets/logos/tableau.svg";
import dsaLogo from "../assets/logos/dsa.png";

function Skills() {
  const allSkills = useMemo(
    () => [
      { name: "DSA", icon: dsaLogo, level: 7, color: "#d2b791" },
      { name: "React.js", icon: reactLogo, level: 8, color: "#ffffff" },
      { name: "JavaScript", icon: jsLogo, level: 8, color: "#d2b791" },
      { name: "HTML5", icon: htmlLogo, level: 7, color: "#ffffff" },
      { name: "CSS3", icon: cssLogo, level: 6, color: "#ffffff" },
      { name: "Tailwind CSS", icon: tailwindLogo, level: 6, color: "#ffffff" },
      { name: "Node.js", icon: nodeLogo, level: 6, color: "#d2b791" },
      { name: "Express.js", icon: expressLogo, level: 6, color: "#ffffff" },
      { name: "REST APIs", icon: restApiLogo, level: 5, color: "#ffffff" },
      { name: "MongoDB", icon: mongodbLogo, level: 6, color: "#d2b791" },
      { name: "SQL", icon: sqlLogo, level: 7, color: "#ffffff" },
      { name: "PostgreSQL", icon: postgresqlLogo, level: 7, color: "#ffffff" },
      { name: "Java", icon: javaLogo, level: 5, color: "#d2b791" },
      { name: "Python", icon: pythonLogo, level: 6, color: "#d2b791" },
      { name: "NumPy", icon: numpyLogo, level: 5, color: "#ffffff" },
      { name: "Pandas", icon: pandasLogo, level: 5, color: "#ffffff" },
      { name: "TensorFlow", icon: tensorflowLogo, level: 5, color: "#d2b791" },
      { name: "Tableau", icon: tableauLogo, level: 7, color: "#ffffff" },
    ],
    [],
  );

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const [draggedSkillMobile, setDraggedSkillMobile] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const lineRef = useRef(null);
  const dropCircleRef = useRef(null);

  useEffect(() => {
    // Animate line
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          transformOrigin: "left center",
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 0.5, // optimized from true
          },
        },
      );
    }
  }, []);

  // Global touch move handler
  useEffect(() => {
    const handleGlobalTouchMove = (e) => {
      if (!draggedSkillMobile || !dropCircleRef.current) return;
      e.preventDefault();

      const touch = e.touches[0];
      setTouchPos({ x: touch.clientX, y: touch.clientY });

      const dropCircle = dropCircleRef.current.getBoundingClientRect();

      // Check if touch is within drop circle
      const distance = Math.sqrt(
        Math.pow(touch.clientX - dropCircle.left - dropCircle.width / 2, 2) +
          Math.pow(touch.clientY - dropCircle.top - dropCircle.height / 2, 2),
      );

      const radius = dropCircle.width / 2;
      if (distance <= radius && !selectedSkill) {
        // Visual feedback can be added here
      }
    };

    const handleGlobalTouchEnd = (e) => {
      if (!draggedSkillMobile || !dropCircleRef.current) return;

      const touch = e.changedTouches[0];
      const dropCircle = dropCircleRef.current.getBoundingClientRect();

      // Calculate distance from touch end to drop circle center
      const distance = Math.sqrt(
        Math.pow(touch.clientX - dropCircle.left - dropCircle.width / 2, 2) +
          Math.pow(touch.clientY - dropCircle.top - dropCircle.height / 2, 2),
      );

      const radius = dropCircle.width / 2;

      // If dropped within circle, select skill
      if (distance <= radius) {
        setSelectedSkill(draggedSkillMobile);
      }

      setDraggedSkillMobile(null);
    };

    if (draggedSkillMobile) {
      document.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleGlobalTouchEnd);

      return () => {
        document.removeEventListener("touchmove", handleGlobalTouchMove);
        document.removeEventListener("touchend", handleGlobalTouchEnd);
      };
    }
  }, [draggedSkillMobile, selectedSkill]);

  // Desktop drag and drop handlers
  const handleDragStart = useCallback((e, skill) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("skill", JSON.stringify(skill));
  }, []);

  const handleDagOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("skill");
      const skill = JSON.parse(data);
      setSelectedSkill(skill);
    } catch (error) {
      console.error("Drop error:", error);
    }
  }, []);

  // Mobile touch handlers for dragging
  const handleTouchStart = useCallback((e, skill) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      setTouchPos({ x: touch.clientX, y: touch.clientY });
      setDraggedSkillMobile(skill);
    }
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div ref={lineRef} className="skills-line"></div>
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-head">
            {"Skills".split(" ").map((word, index) => (
              <span key={index}>{word} </span>
            ))}
          </h2>
          <button
            className="show-all-btn"
            onClick={() => setShowAllRatings(!showAllRatings)}
          >
            {showAllRatings ? "Hide" : "Show all"}
          </button>
        </div>

        <div className="drop-zone-wrapper">
          <div
            ref={dropCircleRef}
            className={`drop-circle ${selectedSkill ? "active" : ""}`}
            style={{
              boxShadow: selectedSkill
                ? `0 0 50px ${selectedSkill.color}`
                : "0 0 20px rgba(255,255,255,0.3)",
              borderColor: selectedSkill ? selectedSkill.color : "#d2b791",
            }}
            onDragOver={handleDagOver}
            onDrop={handleDrop}
          >
            {!selectedSkill ? (
              <div className="drop-content">
                <p className="drop-text">
                  {window.innerWidth <= 768 ? "Drag a Skill" : "Drag a Skill"}
                </p>
              </div>
            ) : (
              <div className="logo-circle-drop">
                <img src={selectedSkill.icon} alt={selectedSkill.name} />
              </div>
            )}
          </div>
          {selectedSkill && (
            <div className="drop-info">
              <h3 className="drop-name">{selectedSkill.name}</h3>
              <span className="drop-rating">{selectedSkill.level} / 10</span>
            </div>
          )}
        </div>

        {/* All Skills Grid */}
        <div className="skills-grid">
          {allSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`skill-card ${draggedSkillMobile?.name === skill.name ? "dragging" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, skill)}
              onTouchStart={(e) => handleTouchStart(e, skill)}
              style={{
                opacity: draggedSkillMobile?.name === skill.name ? 0.6 : 1,
                transition: "opacity 0.2s ease-out",
                touchAction: "none",
              }}
            >
              <div className="logo-circle">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h4 className="skill-name">{skill.name}</h4>
              {showAllRatings && (
                <span className="skill-level">{skill.level} / 10</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating drag ghost for mobile */}
      {draggedSkillMobile && (
        <div
          className="drag-ghost"
          style={{
            left: touchPos.x,
            top: touchPos.y,
            borderColor: draggedSkillMobile.color,
            boxShadow: `0 0 20px ${draggedSkillMobile.color}80`,
          }}
        >
          <img src={draggedSkillMobile.icon} alt={draggedSkillMobile.name} />
        </div>
      )}
    </section>
  );
}

export default Skills;
