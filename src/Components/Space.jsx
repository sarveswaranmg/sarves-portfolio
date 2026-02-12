import { useEffect, useRef } from "react";
import "./Space.css";

import reactLogo from "../assets/logos/react.svg";
import jsLogo from "../assets/logos/javascript.svg";
import cssLogo from "../assets/logos/css.svg";
import htmlLogo from "../assets/logos/html.svg";
import javaLogo from "../assets/logos/java.svg";
import pythonLogo from "../assets/logos/python.svg";
import tailwindLogo from "../assets/logos/tailwind-css.svg";
import nodeLogo from "../assets/logos/nodejs.svg";
import expressLogo from "../assets/logos/expressjs.svg";
import restApiLogo from "../assets/logos/rest-api.svg";
import mongodbLogo from "../assets/logos/mongodb.svg";
import sqlLogo from "../assets/logos/sql.svg";
import postgresqlLogo from "../assets/logos/postgresql.svg";

import numpyLogo from "../assets/logos/numpy.svg";
import pandasLogo from "../assets/logos/pandas.svg";
import tensorflowLogo from "../assets/logos/tensorflow.svg";
import tableauLogo from "../assets/logos/tableau.svg";
import dsaLogo from "../assets/logos/dsa.png";
export default function Space() {
  const universeRef = useRef(null);

  useEffect(() => {
    const universe = universeRef.current;
    if (!universe) return;

    // Clear existing particles (important for React StrictMode)
    universe.innerHTML = "";

    const logos = [
      reactLogo,
      jsLogo,
      cssLogo,
      htmlLogo,
      javaLogo,
      pythonLogo,
      tailwindLogo,
      nodeLogo,
      expressLogo,
      restApiLogo,
      mongodbLogo,
      sqlLogo,
      postgresqlLogo,
      numpyLogo,
      pandasLogo,
      tensorflowLogo,
      tableauLogo,
      dsaLogo,
    ];

    const symbols = [
      "<",
      ">",
      "{}",
      "()",
      ";",
      "/>",
      "def",
      "class",
      "=>",
      "[]",
      "useState",
      "useEffect",
      "useRef",
    ];

    const logoCount = 50; // controlled density
    const symbolCount = 24; // very subtle

    const createLogo = () => {
      const img = document.createElement("img");
      img.className = "logoParticle";
      img.src = logos[Math.floor(Math.random() * logos.length)];
      img.loading = "lazy";

      img.style.left = Math.random() * 100 + "vw";
      img.style.top = Math.random() * 100 + "vh";

      img.style.setProperty("--rotate", Math.random() * 360 + "deg");

      img.style.animationDuration = 22 + Math.random() * 12 + "s";
      img.style.animationDelay = -(Math.random() * 30) + "s";

      return img;
    };

    const createSymbol = () => {
      const el = document.createElement("div");
      el.className = "syntaxParticle";
      el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

      el.style.left = Math.random() * 100 + "vw";
      el.style.top = Math.random() * 100 + "vh";

      el.style.setProperty("--rotate", Math.random() * 360 + "deg");

      el.style.animationDuration = 25 + Math.random() * 15 + "s";
      el.style.animationDelay = -(Math.random() * 30) + "s";

      return el;
    };

    for (let i = 0; i < logoCount; i++) {
      universe.appendChild(createLogo());
    }

    for (let i = 0; i < symbolCount; i++) {
      universe.appendChild(createSymbol());
    }
  }, []);

  return <div className="universe" ref={universeRef} aria-hidden="true" />;
}
