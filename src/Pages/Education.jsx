import React, { useEffect, useRef } from "react";
import "./Education.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "../Components/LightRays";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const shadowState = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrameRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

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
    let lastShadowX = 0;
    let lastShadowY = 0;

    const smoothShadowUpdate = () => {
      const state = shadowState.current;

      // Smooth interpolation
      state.x += (state.targetX - state.x) * 0.1;
      state.y += (state.targetY - state.y) * 0.1;

      // Only update DOM when shadow actually changed (> 0.5px difference)
      const roundedX = Math.round(state.x * 0.6 * 10) / 10;
      const roundedY = Math.max(0, Math.round(state.y * 0.8 * 10) / 10);

      if (
        Math.abs(roundedX - lastShadowX) > 0.5 ||
        Math.abs(roundedY - lastShadowY) > 0.5
      ) {
        lastShadowX = roundedX;
        lastShadowY = roundedY;

        // Direct DOM manipulation instead of setState to avoid React re-renders
        if (cardRef.current) {
          cardRef.current.style.boxShadow = `${roundedX}px ${roundedY}px 20px 8px rgba(255, 255, 255, 0.12)`;
        }
      }

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
    if (isMobile) {
      // Auto-animate shadow drift on mobile
      let time = 0;
      const driftLoop = () => {
        time += 0.04;
        shadowState.current.targetX = Math.sin(time * 1.2) * 20;
        shadowState.current.targetY = Math.abs(Math.cos(time * 0.8)) * 8;
        requestAnimationFrame(driftLoop);
      };
      const id = requestAnimationFrame(driftLoop);
      return () => cancelAnimationFrame(id);
    }

    // Desktop: mouse tracking
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const deltaX = e.clientX - cardCenterX;
      const deltaY = e.clientY - cardCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);
      const shadowDistance = Math.min(distance / 10, 60);
      shadowState.current.targetX = Math.cos(angle) * shadowDistance;
      shadowState.current.targetY = Math.max(
        0,
        Math.sin(angle) * shadowDistance,
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section className="education-section" ref={sectionRef} id="education">
      {/* Line above the section */}
      <div ref={lineRef} className="education-line"></div>

      {/* Background Light Rays */}
      <div className="education-bg">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
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

        <div ref={cardRef} className="education-card">
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
