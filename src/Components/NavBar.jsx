import React from "react";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="nav-container">
      <div className="left-name">Sarves</div>
      <div className="nav-bar">
        <div>Home</div>
        <div>About</div>
        <div>Projects</div>
        <div>Skills</div>
        <div>Education</div>
      </div>
      <div className="glass-card">
        Open to work <span className="status-color"></span>
      </div>
    </div>
  );
}

export default NavBar;
