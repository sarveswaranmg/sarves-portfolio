import React, { useState, useEffect, useRef } from "react";
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
  const allSkills = [
    // Frontend
    { name: "DSA", icon: dsaLogo, level: 9, color: "#fb6161" },
    { name: "React.js", icon: reactLogo, level: 9, color: "#61DBFB" },
    { name: "JavaScript", icon: jsLogo, level: 8.5, color: "#F7DF1E" },
    { name: "HTML5", icon: htmlLogo, level: 9, color: "#E34F26" },
    { name: "CSS3", icon: cssLogo, level: 9, color: "#1572B6" },
    { name: "Tailwind CSS", icon: tailwindLogo, level: 8.5, color: "#38BDF8" },

    // Backend
    { name: "Node.js", icon: nodeLogo, level: 8.5, color: "#68A063" },
    { name: "Express.js", icon: expressLogo, level: 8, color: "#ffffff" },
    { name: "REST APIs", icon: restApiLogo, level: 8.5, color: "#00ffcc" },

    // Database
    { name: "MongoDB", icon: mongodbLogo, level: 8, color: "#4DB33D" },
    { name: "SQL", icon: sqlLogo, level: 8.5, color: "#336791" },
    { name: "PostgreSQL", icon: postgresqlLogo, level: 8, color: "#336791" },

    { name: "Java", icon: javaLogo, level: 8.5, color: "#f89820" },
    { name: "Python", icon: pythonLogo, level: 8.5, color: "#3776AB" },
    { name: "NumPy", icon: numpyLogo, level: 8, color: "#013243" },
    { name: "Pandas", icon: pandasLogo, level: 8, color: "#150458" },
    { name: "TensorFlow", icon: tensorflowLogo, level: 7.5, color: "#FF6F00" },
    { name: "Tableau", icon: tableauLogo, level: 7.5, color: "#FF6F00" },
  ];

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const lineRef = useRef(null);

  useEffect(() => {
    // Animate line
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
          scrub: true,
        },
      },
    );
  }, []);

  const handleDragStart = (e, skill) => {
    e.dataTransfer.setData("skill", JSON.stringify(skill));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("skill");
    const skill = JSON.parse(data);
    setSelectedSkill(skill);
  };

  return (
    <section className="skills-section">
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
            className={`drop-circle ${selectedSkill ? "active" : ""}`}
            style={{
              boxShadow: selectedSkill
                ? `0 0 50px ${selectedSkill.color}`
                : "0 0 20px rgba(255,255,255,0.3)",
              borderColor: selectedSkill ? selectedSkill.color : "#fff",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {!selectedSkill ? (
              <div className="drop-content">
                <p className="drop-text">Drag a Skill</p>
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
              key={index}
              className="skill-card"
              draggable
              onDragStart={(e) => handleDragStart(e, skill)}
            >
              <div className="logo-circle">
                <img src={skill.icon} alt={skill.name} />
              </div>
              <h4 className="skill-name">{skill.name}</h4>
              {showAllRatings && (
                <span className="skill-level">{skill.level} / 10</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
