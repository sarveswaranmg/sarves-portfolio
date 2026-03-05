import "../fonts.css";
import "../index.css";
import "../App.css";
import Script from "next/script";
import { sora, inter, spaceMono } from "../lib/fonts";

// Static generation - build once, serve statically forever
export const dynamic = "force-static";
export const revalidate = false; // Pure SSG - no revalidation
export const maxDuration = 60;

export const metadata = {
  metadataBase: new URL("https://sarves.dev"),
  title: "Sarveswaran MG",
  description:
    "Sarveswaran MG – Full-stack Software Developer & ML Engineer from VIT Chennai. Expert in React, JavaScript, Python, Node.js, TensorFlow, and more. View projects, skills, and contact.",
  keywords: [
    "Sarves",
    "Sarveswaran",
    "Sarveswaran MG",
    "software developer",
    "ML engineer",
    "web designer",
    "full stack developer",
    "React developer",
    "portfolio",
    "VIT Chennai",
    "JavaScript",
    "Python",
    "TensorFlow",
    "Node.js",
    "web developer India",
  ],
  authors: [{ name: "Sarveswaran MG" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://sarves.dev/",
  },
  openGraph: {
    type: "website",
    url: "https://sarves.dev/",
    title: "Sarveswaran MG – Software Developer & ML Engineer",
    description:
      "Full-stack Software Developer & ML Engineer specializing in React, JavaScript, Python, and modern web technologies. Explore my projects, skills, and experience.",
    images: [
      {
        url: "/preview.png",
        secureUrl: "https://sarves.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "Sarves - Sarveswaran MG Portfolio",
        type: "image/png",
      },
    ],
    siteName: "Sarves Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarveswaran MG – Software Developer & ML Engineer",
    description:
      "Full-stack Software Developer & ML Engineer specializing in React, JavaScript, Python, and modern web technologies. Explore my projects, skills, and experience.",
    images: [
      {
        url: "/preview.png",
        alt: "Sarveswaran MG Portfolio",
      },
    ],
    creator: "@sarves",
    site: "@sarves",
  },
  icons: {
    icon: { url: "/favi.png", type: "image/png" },
    apple: "/favi.png",
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Sarves Portfolio",
    subject: "Software Developer Portfolio",
    rating: "general",
    coverage: "Worldwide",
    distribution: "global",
    language: "English",
    thumbnail: "https://sarves.dev/preview.png",
  },
  verification: {
    google: "",
  },
};

export const viewport = {
  themeColor: "#000000",
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://sarves.dev/#person",
  name: "Sarveswaran MG",
  alternateName: ["Sarves", "Sarveswaran"],
  url: "https://sarves.dev",
  image: "https://sarves.dev/preview.png",
  jobTitle: "Software Developer",
  description:
    "Full-stack Software Developer & ML Engineer specializing in React, JavaScript, Python, and modern web technologies.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vellore Institute of Technology, Chennai",
    sameAs: "https://vit.ac.in",
  },
  knowsAbout: [
    "React.js",
    "JavaScript",
    "Python",
    "Node.js",
    "TensorFlow",
    "Machine Learning",
    "Web Development",
    "SQL",
    "MongoDB",
  ],
  sameAs: [
    "https://github.com/sarveswaranmg",
    "https://linkedin.com/in/sarveswaranmg",
  ],
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sarves Portfolio",
  alternateName: "Sarveswaran MG Portfolio",
  url: "https://sarves.dev",
  description:
    "Portfolio of Sarveswaran MG (Sarves) - Software Developer & ML Engineer",
  author: {
    "@id": "https://sarves.dev/#person",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body>
        <div id="root">{children}</div>

        {/* SEO fallback for crawlers that don't run JavaScript */}
        <noscript>
          <h1>
            Sarveswaran MG (Sarves) – Software Developer &amp; ML Engineer
          </h1>
          <p>
            Full-stack Software Developer and Machine Learning Engineer from VIT
            Chennai. Skilled in React.js, JavaScript, Python, Node.js,
            TensorFlow, MongoDB, SQL, and more.
          </p>
          <h2>About Sarves</h2>
          <p>
            I&apos;m Sarveswaran MG, a passionate problem-solver who enjoys
            turning ideas into meaningful, real-world solutions. With a strong
            analytical mindset and deep curiosity for how things work, I
            approach challenges with both structure and creativity.
          </p>
          <h2>Skills</h2>
          <p>
            React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Node.js,
            Express.js, REST APIs, MongoDB, SQL, PostgreSQL, Java, Python,
            NumPy, Pandas, TensorFlow, Tableau, Data Structures &amp; Algorithms
          </p>
          <h2>Education</h2>
          <p>
            M.Tech (Integrated) – Computer Science, Specialization in Business
            Analytics, Vellore Institute of Technology (VIT), Chennai
            (2020-2025)
          </p>
          <h2>Projects</h2>
          <ul>
            <li>
              Anfed – Agriculture platform with interactive maps and analytics
              dashboards
            </li>
            <li>
              Fenivi – Single Page Application with real-time events and blogs
            </li>
            <li>
              Porous Being – Architecture portfolio with horizontal galleries
            </li>
          </ul>
          <h2>Contact</h2>
          <p>Email: mfgsarvesh15@gmail.com</p>
        </noscript>

        {/* Prevent debugging */}
        <Script id="devtools-detection" strategy="afterInteractive">{`
          var devtools = { open: false, orientation: null };
          var threshold = 160;
          setInterval(function() {
            if (
              window.outerHeight - window.innerHeight > threshold ||
              window.outerWidth - window.innerWidth > threshold
            ) {
              if (!devtools.open) {
                devtools.open = true;
                devtools.orientation =
                  window.outerHeight - window.innerHeight >
                  window.outerWidth - window.innerWidth
                    ? "vertical"
                    : "horizontal";
              }
            } else {
              devtools.open = false;
              devtools.orientation = null;
            }
          }, 500);
        `}</Script>

        {/* Service Worker Registration */}
        <Script id="sw-registration" strategy="afterInteractive">{`
          if ("serviceWorker" in navigator) {
            window.addEventListener("load", function() {
              navigator.serviceWorker
                .register("/sw.js", { scope: "/" })
                .then(function(registration) {
                  console.log("[App] Service Worker registered:", registration);
                  setInterval(function() {
                    registration.update();
                  }, 60000);
                  registration.addEventListener("updatefound", function() {
                    var newWorker = registration.installing;
                    newWorker.addEventListener("statechange", function() {
                      if (
                        newWorker.state === "activated" &&
                        navigator.serviceWorker.controller
                      ) {
                        console.log("[App] New service worker activated");
                      }
                    });
                  });
                })
                .catch(function(error) {
                  console.error("[App] Service Worker registration failed:", error);
                });
            });
            navigator.serviceWorker.addEventListener("message", function(event) {
              if (event.data && event.data.type === "CACHE_UPDATED") {
                console.log("[App] Cache updated:", event.data.payload);
              }
            });
          }
        `}</Script>
      </body>
    </html>
  );
}
