import React, { useEffect, useRef, useState } from "react";
import "./education.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "../Components/LightRays"; // adjust path

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const [shadowStyle, setShadowStyle] = useState({});
  const shadowState = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrameRef = useRef(null);

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

    // Animate education card
    gsap.fromTo(
      cardRef.current,
      { opacity: 0.3, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 65%",
          scrub: true,
        },
      },
    );
  }, []);

  useEffect(() => {
    const smoothShadowUpdate = () => {
      const state = shadowState.current;

      // Smooth interpolation
      state.x += (state.targetX - state.x) * 0.1;
      state.y += (state.targetY - state.y) * 0.1;

      // Generate dynamic multi-layer shadow based on cursor position
      const shadowLayers = [
        `${state.x * 0.6}px ${state.y * 0.8}px 10px 5px rgba(255, 255, 255, 0.05)`,
      ];

      setShadowStyle({
        boxShadow: shadowLayers.join(", "),
      });

      animationFrameRef.current = requestAnimationFrame(smoothShadowUpdate);
    };

    animationFrameRef.current = requestAnimationFrame(smoothShadowUpdate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate angle and distance
      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Calculate shadow offset based on cursor position
      const shadowDistance = Math.min(distance / 10, 60);
      shadowState.current.targetX = Math.cos(angle) * shadowDistance;
      shadowState.current.targetY = Math.sin(angle) * shadowDistance;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="education-section" ref={sectionRef} id="education">
      {/* Line above the section */}
      <div ref={lineRef} className="education-line"></div>

      {/* Background Light Rays */}
      <div className="education-bg">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.1}
          lightSpread={0.4}
          rayLength={3.1}
          pulsating={false}
          fadeDistance={0.5}
          saturation={0.7}
          followMouse
          mouseInfluence={0.2}
          noiseAmount={0.15}
          distortion={0}
        />
      </div>

      {/* Foreground Content */}
      <div className="education-content-wrapper">
        <h2 className="education-title">Education</h2>

        <div ref={cardRef} className="education-card" style={shadowStyle}>
          <span className="education-year">2020 – 2025</span>

          <h3 className="degree">M.Tech (Integrated) – Computer Science</h3>

          <p className="specialization">Specialization in Business Analytics</p>

          <p className="university">
            Vellore Institute of Technology (VIT), Chennai
          </p>

          <p className="description">
            Built strong foundations in software engineering, data systems, and
            data-driven decision making.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;
