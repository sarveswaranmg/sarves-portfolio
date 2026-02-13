import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable source maps in production
    sourcemap: false,

    // Minification with aggressive optimization
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // double pass minification for better compression
      },
      mangle: true,
      format: {
        comments: false,
      },
    },

    // Optimize build output with code splitting
    rollupOptions: {
      output: {
        // Code splitting strategy for better caching
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("gsap")) {
              return "vendor-gsap";
            }
            if (id.includes("react")) {
              return "vendor-react";
            }
            return "vendor-common";
          }

          // Component chunks for lazy loading
          if (id.includes("Pages/")) {
            const match = id.match(/Pages\/([^/]+)/);
            if (match) {
              return `page-${match[1].replace(".jsx", "").toLowerCase()}`;
            }
          }
        },
        // Minify generated code
        compact: true,
        generatedCode: {
          preset: "es2015",
        },
      },
    },

    // Optimize for production
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,

    // Cache busting and optimization
    cssCodeSplit: true,

    // Improve rendering performance
    commonjsOptions: {
      include: [/node_modules/],
    },
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    exclude: ["gsap/ScrollTrigger", "ogl"],
    include: ["react", "react-dom", "framer-motion", "gsap", "react-typed"],
  },

  // Security headers for dev preview
  preview: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
});
