"use client";

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
  memo,
} from "react";
import "./Projects.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResearchFlowchart from "../Components/ResearchFlowchart";

gsap.registerPlugin(ScrollTrigger);

// Memoized Research Card Component for better performance
const ResearchCard = memo(({ paper, onPaperView, cardRef }) => {
  const handleLearnMore = useCallback(() => {
    onPaperView(paper);
  }, [paper, onPaperView]);

  return (
    <article
      ref={cardRef}
      className="research-card"
      itemScope
      itemType="https://schema.org/ScholarlyArticle"
    >
      <div className="research-body">
        {paper.published && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="published-badge"
          >
            Published
          </a>
        )}

        <h3 className="research-heading" itemProp="name headline">
          {paper.title}
        </h3>

        <p className="research-description" itemProp="description">
          {paper.description}
        </p>

        <div className="research-tags" itemProp="keywords">
          {paper.tags.map((tag) => (
            <span key={tag} className="research-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="research-actions">
          <button
            className="research-cta"
            onClick={handleLearnMore}
            aria-label={`Learn more about ${paper.title}`}
          >
            Learn More
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          {paper.published && (
            <a
              href={paper.published}
              target="_blank"
              rel="noopener noreferrer"
              className="research-published-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View publication for ${paper.title}`}
              itemProp="url"
            >
              View Publication
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

ResearchCard.displayName = "ResearchCard";

function Projects() {
  const lineRef = useRef(null);
  const researchLineRef = useRef(null);
  const cardsRef = useRef([]);
  const researchCardsRef = useRef([]);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const projects = useMemo(
    () => [
      {
        title: "Anfed",
        url: "https://www.anfed.in/",
        description:
          "Agriculture platform with interactive maps and analytics dashboards. Optimized with lazy loading and code splitting for 60–80% faster performance. Built with scalable architecture and responsive animated UI.",
      },
      {
        title: "Fenivi",
        url: "https://www.feniviresearch.com/",
        description:
          "Single Page Application with real-time events, blogs, and articles. Integrated Firestore subscriptions for dynamic updates. Modern animated UI using Tailwind CSS and modular components.",
      },
      {
        title: "Porous Being",
        url: "https://www.porousbeing.com/",
        description:
          "Architecture portfolio with horizontal galleries and modal views. Implemented smooth GSAP animations and optimized media loading. Responsive and SEO-friendly design with clean UI experience.",
      },
    ],
    [],
  );

  const researchPapers = useMemo(
    () => [
      {
        id: 1,
        title:
          "GDP Per Capita Forecasting using Machine Learning and Time-Series Models",
        description:
          "A predictive analytics study analyzing socio-economic indicators affecting India's GDP per capita. Combines machine learning and statistical forecasting models for accurate economic prediction. Provides insights useful for policy planning and long-term economic decision making.",
        tags: [
          "Python",
          "ARIMA",
          "Support Vector Regression (SVR)",
          "XGBoost",
          "Data Imputation (misForest)",
          "Time Series Analysis",
        ],
        abstract:
          "This paper is about identifying the contributing socio-economic indicators that affect the Gross Domestic Product Per Capita of India with historical data from 1960 to 2021 and build a methodology to predict the Gross Domestic Product per capita based on the contributing factors. To predict India's GDP per capita, an ensemble prediction was used, which included Support Vector Regression (SVR), the Extreme Gradient Boosting Model, and the ARIMA Model. It is critical to forecast GDP per capita and its influencing factors for better policy formulation, resource allocation, risk management, investment decisions, long-term planning, social welfare, and other purposes. This paper could contribute to encouraging long-term economic growth and improve citizens' quality of life. The findings of this paper provide an in-depth understanding of the intricate relationship between socioeconomic indicators and Gross Domestic Product in India.",
        flowNodes: [
          {
            id: "1",
            label: "Dataset Collection",
            type: "start",
            row: 0,
            col: 1,
          },
          {
            id: "2",
            label: "Data Cleaning & Feature Engineering",
            type: "normal",
            row: 1,
            col: 1,
          },
          {
            id: "3",
            label: "Feature Selection",
            type: "normal",
            row: 2,
            col: 1,
          },
          { id: "4", label: "Model Split", type: "split", row: 3, col: 1 },
          {
            id: "5",
            label: "ARIMA (Time Series)",
            type: "parallel",
            row: 4,
            col: 0,
          },
          {
            id: "6",
            label: "SVR (Regression)",
            type: "parallel",
            row: 4,
            col: 1,
          },
          {
            id: "7",
            label: "XGBoost (Boosting)",
            type: "parallel",
            row: 4,
            col: 2,
          },
          {
            id: "8",
            label: "Ensemble Combination",
            type: "merge",
            row: 5,
            col: 1,
          },
          {
            id: "9",
            label: "GDP Forecast Output",
            type: "normal",
            row: 6,
            col: 1,
          },
          {
            id: "10",
            label: "Economic Insight Analysis",
            type: "end",
            row: 7,
            col: 1,
          },
        ],
        flowEdges: [
          { from: "1", to: "2" },
          { from: "2", to: "3" },
          { from: "3", to: "4" },
          { from: "4", to: "5" },
          { from: "4", to: "6" },
          { from: "4", to: "7" },
          { from: "5", to: "8" },
          { from: "6", to: "8" },
          { from: "7", to: "8" },
          { from: "8", to: "9" },
          { from: "9", to: "10" },
        ],
        published: "https://ieeexplore.ieee.org/document/10962623",
      },

      {
        id: 2,
        title:
          "End-to-End Encrypted Chat System using AES and Diffie-Hellman Key Exchange",
        description:
          "A secure messaging system implementing hybrid cryptography for protected communication. Diffie-Hellman establishes secure key exchange while AES ensures encrypted message transmission. Designed to prevent interception and ensure confidentiality in digital communication.",
        tags: [
          "AES Encryption (128-bit)",
          "Diffie-Hellman Key Exchange",
          "Java Crypto Libraries",
          "Base64 Encoding",
          "Network Security Protocols",
        ],
        abstract:
          "In this paper, a secure chatting application with end to end encryption for chat system has been proposed. This is achieved by the use of public key cryptography techniques. The proposed application used the Elliptic Curve Diffie Hellman Key Exchange (ECDH) algorithm to generate the key pair and exchange to produce the shared key that will be used for the encryption of data by symmetric algorithms. The proposed Application allows the users to communicate via text messages.For the text message security the standard AES algorithm with a 128 bit key.",
        flowNodes: [
          {
            id: "1",
            label: "User A: Generate Keys",
            type: "branch-left",
            row: 0,
            col: 0,
          },
          {
            id: "2",
            label: "User B: Generate Keys",
            type: "branch-right",
            row: 0,
            col: 2,
          },
          {
            id: "3",
            label: "Diffie-Hellman Exchange",
            type: "merge",
            row: 1,
            col: 1,
          },
          {
            id: "4",
            label: "Shared Secret Key",
            type: "normal",
            row: 2,
            col: 1,
          },
          { id: "5", label: "AES Encryption", type: "normal", row: 3, col: 1 },
          {
            id: "6",
            label: "Secure Transmission",
            type: "normal",
            row: 4,
            col: 1,
          },
          { id: "7", label: "AES Decryption", type: "normal", row: 5, col: 1 },
          {
            id: "8",
            label: "Secure Message View",
            type: "end",
            row: 6,
            col: 1,
          },
        ],
        flowEdges: [
          { from: "1", to: "3" },
          { from: "2", to: "3" },
          { from: "3", to: "4" },
          { from: "4", to: "5" },
          { from: "5", to: "6" },
          { from: "6", to: "7" },
          { from: "7", to: "8" },
        ],
      },
      {
        id: 3,
        title:
          "Multilingual Video Content Summarization using NLP and Translation Models",
        description:
          "An intelligent system that converts video content into text, generates summaries, and translates them into multiple languages. The solution improves accessibility and learning efficiency by reducing video consumption time. Combines speech recognition, NLP summarization, and machine translation.",
        tags: [
          "Python",
          "Speech Recognition",
          "spaCy",
          "NLTK",
          "HuggingFace Transformers",
          "GoogleTrans API",
          "ROUGE & BLEU Metrics",
        ],
        abstract:
          "All of us are in need of some application that is able to save our time from watching a full lengthy video to get information. Video to text summarization along with language translation is very useful for most students and for those who wish to read the content instead of watching a video. We have proposed a system that transforms video to text , summarizes the text and then a translator to switch languages according to our need. People often prefer to communicate using their mother tongue. It is the language with which they are most comfortable communicating and the one that they use in their day-to-day activities. This is the reason why we ask individuals to translate the material into their native language; it will help people better grasp the content. The purpose of this work is to guarantee that the information presented in the video is understood by all individuals in the simplest and most accurate manner possible.",
        flowNodes: [
          { id: "1", label: "Video Input", type: "start", row: 0, col: 1 },
          {
            id: "2",
            label: "Transcript Extraction",
            type: "normal",
            row: 1,
            col: 1,
          },
          {
            id: "3",
            label: "Text Preprocessing",
            type: "normal",
            row: 2,
            col: 1,
          },
          { id: "4", label: "Split Processing", type: "split", row: 3, col: 1 },
          {
            id: "5",
            label: "Extractive Summarization",
            type: "parallel",
            row: 4,
            col: 0,
          },
          {
            id: "6",
            label: "Abstractive Summarization",
            type: "parallel",
            row: 4,
            col: 1,
          },
          {
            id: "7",
            label: "Translation Module",
            type: "parallel",
            row: 4,
            col: 2,
          },
          { id: "8", label: "Merge Summaries", type: "merge", row: 5, col: 1 },
          {
            id: "9",
            label: "Evaluation Metrics",
            type: "normal",
            row: 6,
            col: 1,
          },
          { id: "10", label: "Final Output", type: "end", row: 7, col: 1 },
        ],
        flowEdges: [
          { from: "1", to: "2" },
          { from: "2", to: "3" },
          { from: "3", to: "4" },
          { from: "4", to: "5" },
          { from: "4", to: "6" },
          { from: "4", to: "7" },
          { from: "5", to: "8" },
          { from: "6", to: "8" },
          { from: "7", to: "8" },
          { from: "8", to: "9" },
          { from: "9", to: "10" },
        ],
      },
      {
        id: 4,
        title:
          "Student–Teacher Query Solving Platform using NoSQL Architecture",
        description:
          "A centralized digital platform designed to streamline communication between students and teachers through a ticket-based query system. The system enables secure authentication, structured query handling, and efficient resolution tracking. Built using Django and MongoDB to support scalable academic communication.",
        tags: [
          "Django",
          "MongoDB",
          "Djongo",
          "PyMongo",
          "HTML / CSS",
          "MVC Architecture",
        ],
        abstract:
          "This research proposes a web-based ticket raising system that improves student–teacher interaction by enabling structured query submission and resolution. The platform integrates Django backend services with MongoDB document storage to support scalable and flexible data handling. The system enhances response efficiency while maintaining secure authentication and role-based access.",
        flowNodes: [
          {
            id: "1",
            label: "Problem Communication Gap",
            type: "start",
            row: 0,
            col: 1,
          },
          {
            id: "2",
            label: "Authentication System",
            type: "normal",
            row: 1,
            col: 1,
          },
          {
            id: "3",
            label: "Role Identification",
            type: "split",
            row: 2,
            col: 1,
          },
          {
            id: "4",
            label: "Student: Submit Query",
            type: "branch-left",
            row: 3,
            col: 0,
          },
          {
            id: "5",
            label: "Teacher: View Queries",
            type: "branch-right",
            row: 3,
            col: 2,
          },
          {
            id: "6",
            label: "Django Backend Hub",
            type: "merge",
            row: 4,
            col: 1,
          },
          { id: "7", label: "MongoDB Storage", type: "normal", row: 5, col: 1 },
          {
            id: "8",
            label: "Query Resolution Update",
            type: "normal",
            row: 6,
            col: 1,
          },
          { id: "9", label: "Final Output", type: "end", row: 7, col: 1 },
        ],
        flowEdges: [
          { from: "1", to: "2" },
          { from: "2", to: "3" },
          { from: "3", to: "4" },
          { from: "3", to: "5" },
          { from: "4", to: "6" },
          { from: "5", to: "6" },
          { from: "6", to: "7" },
          { from: "7", to: "8" },
          { from: "8", to: "9" },
        ],
      },
      {
        id: 5,
        title:
          "Operational Excellence Optimization using AHP, TOPSIS and Lean Six Sigma",
        description:
          "A multi-criteria decision framework designed to improve restaurant operational efficiency. Branches were evaluated using analytical ranking and quality improvement methodologies. Lean Six Sigma principles identified high-impact improvements for customer satisfaction.",
        tags: [
          "AHP",
          "TOPSIS",
          "Pareto Analysis",
          "QFD",
          "Lean Six Sigma",
          "Decision Analytics",
        ],
        abstract:
          "This project aims to evaluate and improve the operational excellence of a particular Hotel , which operates five branches in Chennai (Adyar, Taramani, Nungabakkam, Keelkattalai, and Anna Nagar). Using Analytical Hierarchy Process (AHP) and Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS), the branches were ranked based on five primary criteria: Food Quality, Service, Parking, Waiting Time, and Seat Arrangement. Each primary criterion was further divided into sub-criteria, making the analysis comprehensive and detailed. The results indicated that Adyar and Keelkatalai branch were ranked 4th and 5th, respectively. Focused improvements were proposed for the Keelkatalai branch, targeting layout changes to enhance seating arrangement, ambiance, and reduce waiting time. Pareto chart analysis identified the most critical criteria, and Quality Function Deployment (QFD) was employed to prioritize improvement areas in customers point of view. This project is a significant part of our Lean Six Sigma initiative aimed at achieving operational excellence and enhancing customer satisfaction.",
        flowNodes: [
          { id: "1", label: "DEFINE", type: "start", row: 0, col: 1 },
          { id: "2", label: "MEASURE", type: "normal", row: 1, col: 1 },
          { id: "3", label: "Analysis Split", type: "split", row: 2, col: 1 },
          { id: "4", label: "AHP", type: "parallel", row: 3, col: 0 },
          { id: "5", label: "TOPSIS", type: "parallel", row: 3, col: 1 },
          { id: "6", label: "Data Review", type: "parallel", row: 3, col: 2 },
          { id: "7", label: "Decision Fusion", type: "merge", row: 4, col: 1 },
          { id: "8", label: "Pareto Analysis", type: "normal", row: 5, col: 1 },
          { id: "9", label: "QFD", type: "normal", row: 6, col: 1 },
          { id: "10", label: "IMPROVE", type: "normal", row: 7, col: 1 },
          { id: "11", label: "CONTROL", type: "end", row: 8, col: 1 },
        ],
        flowEdges: [
          { from: "1", to: "2" },
          { from: "2", to: "3" },
          { from: "3", to: "4" },
          { from: "3", to: "5" },
          { from: "3", to: "6" },
          { from: "4", to: "7" },
          { from: "5", to: "7" },
          { from: "6", to: "7" },
          { from: "7", to: "8" },
          { from: "8", to: "9" },
          { from: "9", to: "10" },
          { from: "10", to: "11" },
          { from: "11", to: "2", type: "feedback" },
        ],
      },
      {
        id: 6,
        title:
          "AI-Powered Privacy Protection System for Social Media Consent Management",
        description:
          "An intelligent face recognition system that enforces consent-based privacy in social media. Automatically detects faces in uploaded images and requests approval before publishing. Combines MTCNN detection, ResNet embeddings, and human-in-the-loop decision making to protect individual privacy while enabling seamless content sharing.",
        tags: [
          "Face Recognition",
          "Computer Vision",
          "Deep Learning",
          "Ethical AI",
          "MTCNN",
          "ResNet",
          "React.js",
          "Nhost",
          "Python Microservices",
          "Privacy Engineering",
        ],
        abstract:
          "In today’s digital world, the widespread use of social media has led to increasing concerns about privacy, particularly around the unauthorized sharing of personal images. This project presents a privacy-focused social media application that integrates a face matching system to protect user identity. The core idea is to ensure that any image containing a registered user's face is not published without their explicit consent.The system uses a Python-based backend service integrated with a React frontend and Nhost for authentication, database, and storage. It employs MTCNN (Multi-task Cascaded Convolutional Neural Network) for accurate face detection and a ResNet-based deep learning model to extract high-dimensional face embeddings. These embeddings are compared using cosine similarity to detect matches with stored user data. If a match is found above a predefined similarity threshold, the matched user’s UUID is returned, and a consent-based notification system is triggered before publishing the image. Extensive evaluation on ten test cases demonstrated the system’s reliability in detecting faces, generating accurate matches, and performing fast enough for near real-time applications. It successfully identified registered users despite variations in pose, lighting, and expression, with each test completing the full process — from detection to notification — effectively. This approach aligns with privacy-by-design principles and demonstrates a practical solution for ethical image sharing on digital platforms. Future developments could include deploying the system in other applications, integrating enhanced features for usability and scalability, and enabling a secure Web3-based identity management system for celebrities and public figures to maintain ownership over their visual presence online.",
        flowNodes: [
          { id: "1", label: "User Ecosystem", type: "start", row: 0, col: 1 },
          {
            id: "2",
            label: "Image Storage (Nhost)",
            type: "normal",
            row: 1,
            col: 1,
          },
          {
            id: "3",
            label: "AI Face Intelligence Hub",
            type: "normal",
            row: 2,
            col: 1,
          },
          {
            id: "4",
            label: "Face Detection (MTCNN)",
            type: "normal",
            row: 3,
            col: 1,
          },
          {
            id: "5",
            label: "Embedding Generation (ResNet)",
            type: "normal",
            row: 4,
            col: 1,
          },
          { id: "6", label: "Match Found?", type: "split", row: 5, col: 1 },
          {
            id: "7",
            label: "Consent Notification",
            type: "branch-left",
            row: 6,
            col: 0,
          },
          {
            id: "8",
            label: "Direct Publish",
            type: "branch-right",
            row: 6,
            col: 2,
          },
          {
            id: "9",
            label: "User Approval Decision",
            type: "split",
            row: 7,
            col: 0,
          },
          { id: "10", label: "Accept", type: "parallel", row: 8, col: 0 },
          { id: "11", label: "Reject", type: "parallel", row: 8, col: 1 },
          { id: "12", label: "Publish Post", type: "merge", row: 9, col: 1 },
          {
            id: "13",
            label: "Privacy Protection",
            type: "end",
            row: 10,
            col: 1,
          },
        ],
        flowEdges: [
          { from: "1", to: "2" },
          { from: "2", to: "3" },
          { from: "3", to: "4" },
          { from: "4", to: "5" },
          { from: "5", to: "6" },
          { from: "6", to: "7" },
          { from: "6", to: "8" },
          { from: "7", to: "9" },
          { from: "9", to: "10" },
          { from: "9", to: "11" },
          { from: "10", to: "12" },
          { from: "8", to: "12" },
          { from: "11", to: "13" },
          { from: "12", to: "13" },
        ],
      },
    ],
    [],
  );

  const handleProjectClick = useCallback((url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handlePaperView = useCallback((paper) => {
    setSelectedPaper(paper);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPaper(null);
    // Restore body scroll
    document.body.style.overflow = "";
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const animations = [];

    // Animate line
    const lineAnim = gsap.fromTo(
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
          scrub: 0.5,
        },
      },
    );
    animations.push(lineAnim);

    // Animate project cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const cardAnim = gsap.fromTo(
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
            scrub: 0.5,
          },
        },
      );
      animations.push(cardAnim);
    });

    // Animate research line
    const researchLineAnim = gsap.fromTo(
      researchLineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        transformOrigin: "left center",
        ease: "power3.out",
        scrollTrigger: {
          trigger: researchLineRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 0.5,
        },
      },
    );
    animations.push(researchLineAnim);

    // Animate research cards
    researchCardsRef.current.forEach((card) => {
      if (!card) return;
      const cardAnim = gsap.fromTo(
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
            scrub: 0.5,
          },
        },
      );
      animations.push(cardAnim);
    });

    // Cleanup function to kill all animations and ScrollTriggers
    return () => {
      animations.forEach((anim) => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
    };
  }, []);

  // Generate structured data for SEO
  const generateStructuredData = useMemo(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Research & Publications",
      description: "Collection of academic research papers and publications",
      numberOfItems: researchPapers.length,
      itemListElement: researchPapers.map((paper, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          name: paper.title,
          description: paper.abstract,
          keywords: paper.tags.join(", "),
          ...(paper.published && { url: paper.published }),
        },
      })),
    };
    return JSON.stringify(structuredData);
  }, [researchPapers]);

  return (
    <section id="projects" className="projects-section">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData }}
      />

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
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="project-card"
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div
                className="project-preview"
                onClick={() => handleProjectClick(project.url)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleProjectClick(project.url);
                }}
              >
                <iframe
                  src={project.url}
                  title={project.title}
                  loading="lazy"
                  onError={(e) => {
                    // Silently handle iframe loading errors (external content may have issues)
                    console.debug(`[External iframe error] ${project.title}`);
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Publications Section */}
      <div ref={researchLineRef} className="research-line"></div>

      <section
        className="research-container"
        aria-labelledby="research-heading"
      >
        <h2 id="research-heading" className="research-head">
          {"Research & Paper Works".split(" ").map((word, index) => (
            <span key={index}>{word} </span>
          ))}
        </h2>

        <div className="research-grid" role="list">
          {researchPapers.map((paper, index) => (
            <ResearchCard
              key={paper.id}
              paper={paper}
              index={index}
              onPaperView={handlePaperView}
              cardRef={(el) => (researchCardsRef.current[index] = el)}
            />
          ))}
        </div>
      </section>

      {/* Research Details Modal */}
      {selectedPaper && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="modal-title" className="modal-title">
                {selectedPaper.title}
              </h3>
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h4 className="modal-section-title">Abstract</h4>
                <p className="modal-abstract">{selectedPaper.abstract}</p>
              </div>

              <div className="modal-section">
                <h4 className="modal-section-title">Research Methodology</h4>
                <ResearchFlowchart
                  flowNodes={selectedPaper.flowNodes}
                  flowEdges={selectedPaper.flowEdges}
                  isPreview={false}
                />
              </div>

              <div className="modal-section">
                <h4 className="modal-section-title">Technologies</h4>
                <div className="modal-tags">
                  {selectedPaper.tags.map((tag) => (
                    <span key={tag} className="modal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPaper.published && (
                <div className="modal-section">
                  <h4 className="modal-section-title">Publication</h4>
                  <a
                    href={selectedPaper.published}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-published-link"
                    aria-label={`View published paper: ${selectedPaper.title}`}
                  >
                    View Published Paper →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
