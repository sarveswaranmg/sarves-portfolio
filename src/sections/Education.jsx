"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Education.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "../Components/LightRays";
import BorderGlow from "../Components/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile after hydration
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    const resizeListener = () => checkMobile();
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

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
          scrub: 0.5, // optimized from true
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
          scrub: 0.5, // optimized from true
        },
      },
    );
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Auto-animate shadow drift on mobile
      let time = 0;
      const driftLoop = () => {
        time += 0.04;
        requestAnimationFrame(driftLoop);
      };
      const id = requestAnimationFrame(driftLoop);
      return () => cancelAnimationFrame(id);
    }
  }, [isMobile]);

  return (
    <section className="education-section" ref={sectionRef} id="education">
      {/* Line above the section */}
      <div ref={lineRef} className="education-line"></div>

      {/* Background Light Rays */}
      <div className="education-bg">
        <LightRays
          raysOrigin="top-center"
          raysColor="#d2b791"
          raysSpeed={isMobile ? 0.08 : 0.1}
          lightSpread={isMobile ? 0.15 : 0.4}
          rayLength={isMobile ? 2.2 : 3.1}
          pulsating={false}
          fadeDistance={isMobile ? 0.4 : 0.5}
          saturation={isMobile ? 0.8 : 0.7}
          followMouse={!isMobile}
          mouseInfluence={0.35}
          noiseAmount={0.15}
          distortion={0}
          autoAnimate={isMobile}
        />
      </div>

      {/* Foreground Content */}
      <div className="education-content-wrapper">
        <h2 className="education-title">Education</h2>

        <BorderGlow
          ref={cardRef}
          className="education-card"
          edgeSensitivity={30}
          glowColor="35 48 70"
          backgroundColor="#000"
          borderRadius={20}
          glowRadius={40}
          glowIntensity={1.2}
          coneSpread={30}
          colors={['#d2b791', '#d2b791', '#d2b791']}
          fillOpacity={0.3}
        >
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
        </BorderGlow>
      </div>
    </section>
  );
};

export default Education;
