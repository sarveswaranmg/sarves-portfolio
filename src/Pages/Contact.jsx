import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

import githubLogo from "../assets/logos/github.png";
import linkedinLogo from "../assets/logos/linkedin.png";
import leetcodeLogo from "../assets/logos/leetcode.png";
import gmailLogo from "../assets/logos/gmail.png";

export default function Contact() {
  const form = useRef();
  const lineRef = useRef(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const submitFormData = new FormData();
    submitFormData.append("name", formData.get("name"));
    submitFormData.append("email", formData.get("email"));
    submitFormData.append("message", formData.get("message"));

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mfgsarvesh15@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: submitFormData,
        },
      );

      if (response.ok) {
        setIsFormSubmitted(true);
        setTimeout(() => setIsFormSubmitted(false), 3000);
        form.current.reset();
      } else {
        alert("Something went wrong ❌");
      }
    } catch (error) {
      alert("Error sending message ❌");
      console.error("Error:", error);
    }
  };

  const socialLinks = [
    { logo: linkedinLogo, url: "https://linkedin.com/in/your-linkedin" },
    { logo: githubLogo, url: "https://github.com/your-github" },
    { logo: leetcodeLogo, url: "https://leetcode.com/your-leetcode" },
    { logo: gmailLogo, url: "mailto:mfgsarvesh15@gmail.com" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="contact-wrapper">
      <div ref={lineRef} className="contact-line"></div>
      <motion.div
        className="contact-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="contact-title">
          Let's Work Together
        </motion.h1>

        <motion.p variants={itemVariants} className="contact-subtitle">
          Have an idea or opportunity? Send me a message and let's build
          something amazing.
        </motion.p>

        <motion.div variants={itemVariants} className="contact-card">
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea name="message" placeholder="Your Message" required />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFormSubmitted ? "Message Sent 🚀" : "Send"}
            </motion.button>
          </form>
        </motion.div>

        {/* Social Icons Below */}
        <motion.div variants={itemVariants} className="social-row">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -8, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={link.logo} alt="social" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
