import React, { useEffect, useRef } from "react";
import "./Projects.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const lineRef = useRef(null);

  const cardsRef = useRef([]);

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

    // Animate project cards
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0.3, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 65%",
            scrub: true,
          },
        },
      );
    });
  }, []);

  const projects = [
    {
      title: "Anfed",
      url: "https://www.anfed.in/",
      description:
        "Agriculture platform with interactive maps and analytics dashboards. Optimized with lazy loading and code splitting for 60–80% faster performance. Built with scalable architecture and responsive animated UI.",
    },
    {
      title: "Fenivi",
      url: "https://fenivi-6gnz.vercel.app/",
      description:
        "Single Page Application with real-time events, blogs, and articles. Integrated Firestore subscriptions for dynamic updates. Modern animated UI using Tailwind CSS and modular components.",
    },
    {
      title: "Porous Being",
      url: "https://porous-being.vercel.app/",
      description:
        "Architecture portfolio with horizontal galleries and modal views. Implemented smooth GSAP animations and optimized media loading. Responsive and SEO-friendly design with clean UI experience.",
    },
  ];

  return (
    <section className="projects-section">
      <div ref={lineRef} className="projects-line"></div>

      <div className="projects-container">
        <h2 className="projects-head">
          {"Projects".split(" ").map((word, index) => (
            <span key={index}>{word} </span>
          ))}
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="project-card"
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div
                className="project-preview"
                onClick={() => window.open(project.url, "_blank")}
              >
                <iframe
                  src={project.url}
                  title={project.title}
                  className="project-iframe"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
