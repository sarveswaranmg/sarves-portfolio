import React, { useEffect, useRef, useState } from "react";
import "./Education.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "../Components/LightRays"; // adjust path

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const shadowState = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrameRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const [hasDeviceOrientation, setHasDeviceOrientation] = useState(false);

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
      const roundedY = Math.round(state.y * 0.8 * 10) / 10;

      if (
        Math.abs(roundedX - lastShadowX) > 0.5 ||
        Math.abs(roundedY - lastShadowY) > 0.5
      ) {
        lastShadowX = roundedX;
        lastShadowY = roundedY;

        // Direct DOM manipulation instead of setState to avoid React re-renders
        if (cardRef.current) {
          cardRef.current.style.boxShadow = `${roundedX}px ${roundedY}px 10px 5px rgba(255, 255, 255, 0.05)`;
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
    const handleDeviceOrientation = (event) => {
      if (!cardRef.current) return;

      // Get device orientation angles
      const alpha = event.alpha || 0; // Z axis rotation (0-360)
      const beta = event.beta || 0; // X axis rotation (-180 to 180)
      const gamma = event.gamma || 0; // Y axis rotation (-90 to 90)

      // Use beta and gamma for hologram effect (tilt angles)
      // Normalize angles to shadow offset range
      const shadowDistance = 40;
      const shadowX = (gamma / 90) * shadowDistance;
      const shadowY = (beta / 90) * shadowDistance;

      shadowState.current.targetX = shadowX;
      shadowState.current.targetY = shadowY;
    };

    const handleMouseMove = (e) => {
      if (!cardRef.current || isMobile) return;

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

    // Request device orientation permission for iOS 13+
    if (
      isMobile &&
      typeof DeviceOrientationEvent !== "undefined" &&
      DeviceOrientationEvent.requestPermission
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            setHasDeviceOrientation(true);
            window.addEventListener(
              "deviceorientation",
              handleDeviceOrientation,
            );
          }
        })
        .catch(console.error);
    } else if (isMobile && typeof DeviceOrientationEvent !== "undefined") {
      // Android and older iOS
      setHasDeviceOrientation(true);
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    // Desktop mouse tracking
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
