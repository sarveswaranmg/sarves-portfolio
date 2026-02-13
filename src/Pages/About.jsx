import React, { useEffect, useRef, useMemo } from "react";
import "./About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);

  const text = useMemo(
    () =>
      `I'm Sarveswaran MG, a passionate and driven problem-solver who enjoys turning ideas into meaningful, real-world solutions. With a strong analytical mindset and a deep curiosity for how things work, I approach challenges with both structure and creativity. I value consistency, continuous learning, and pushing myself beyond comfort zones to grow personally and professionally. I take pride in building things that are not only functional but impactful, and I'm motivated by the process of improving, refining, and delivering quality work. My goal is to keep evolving, take ownership of what I build, and contribute to projects that create lasting value.`,
    [],
  );

  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    if (!lineRef.current || !textRef.current) return;

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
    const wordElements = textRef.current.querySelectorAll(".word");
    gsap.fromTo(
      wordElements,
      { opacity: 0.3 },
      {
        opacity: 1,
        stagger: {
          each: 0.2, // reduced from 0.4 for faster animation
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "+=500",
          scrub: 0.5, // optimized from true
        },
      },
    );
  }, []);

  return (
    <section className="about-section">
      <div ref={lineRef} className="about-line"></div>
      <div className="about-content">
        <div className="about-container">
          <h1 ref={titleRef} className="about-title">
            {"About Me".split(" ").map((word, index) => (
              <span key={index}>{word} </span>
            ))}
          </h1>
          <div ref={textRef} className="about-description">
            {words.map((word, index) => (
              <span key={index} className="word">
                {word}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
