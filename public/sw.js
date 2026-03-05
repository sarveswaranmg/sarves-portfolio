// Service Worker for offline support and caching
const CACHE_VERSION = "portfolio-v1";
const CACHE_ASSETS = `${CACHE_VERSION}-assets`;
const CACHE_RUNTIME = `${CACHE_VERSION}-runtime`;

// Assets to pre-cache on install
const STATIC_ASSETS = ["/", "/favi.png"];

// Install event - pre-cache critical assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker");

  event.waitUntil(
    (async () => {
      try {
        // Cache static assets
        const cache = await caches.open(CACHE_ASSETS);
        await cache.addAll(
          STATIC_ASSETS.filter((url) => !url.includes("node_modules")),
        );

        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error("[SW] Installation error:", error);
      }
    })(),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker");

  event.waitUntil(
    (async () => {
      try {
        // Delete old caches
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_ASSETS && name !== CACHE_RUNTIME)
            .map((name) => caches.delete(name)),
        );

        // Claim all clients
        self.clients.claim();
      } catch (error) {
        console.error("[SW] Activation error:", error);
      }
    })(),
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external requests
  if (
    request.method !== "GET" ||
    (url.protocol !== "http:" && url.protocol !== "https:")
  ) {
    return;
  }

  // Cache API calls with network fallback
  if (
    url.pathname.includes("/api/") ||
    request.headers.get("accept")?.includes("application/json")
  ) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Cache-first for assets (js, css, images)
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Network-first for HTML documents
  if (request.destination === "document" || request.mode === "navigate") {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Default: network-first
  event.respondWith(networkFirstStrategy(request));
});

// Cache-first strategy: try cache first, fallback to network
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_ASSETS);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);

    // Cache successful responses
    if (response.ok) {
      const clonedResponse = response.clone();
      cache.put(request, clonedResponse);
    }

    return response;
  } catch (error) {
    console.error("[SW] Cache-first error:", error);
    return createOfflineResponse();
  }
}

// Network-first strategy: try network first, fallback to cache
async function networkFirstStrategy(request) {
  const cache = await caches.open(CACHE_RUNTIME);

  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response.ok) {
      const clonedResponse = response.clone();
      cache.put(request, clonedResponse);
    }

    return response;
  } catch (error) {
    console.error("[SW] Network-first error:", error);

    // Try cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // Try asset cache
    const assetCache = await caches.open(CACHE_ASSETS);
    const assetCached = await assetCache.match(request);
    if (assetCached) {
      return assetCached;
    }

    // Return offline response for documents
    if (request.mode === "navigate" || request.destination === "document") {
      return createOfflineResponse();
    }

    return new Response("Offline - resource not available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Create offline response (served when offline & no cache)
function createOfflineResponse() {
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sarves's Portfolio - Offline</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #0a0e27;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }
        .offline-container {
          text-align: center;
          max-width: 400px;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        p {
          font-size: 1.1rem;
          color: #b0b9c1;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .offline-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .retry-btn {
          display: inline-block;
          padding: 0.8rem 1.6rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">📡</div>
        <h1>You're Offline</h1>
        <p>It looks like you've lost your internet connection. Don't worry, your cached portfolio will load once you're back online.</p>
        <button class="retry-btn" onclick="location.reload()">Retry Connection</button>
      </div>
    </body>
    </html>`,
    {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}

// Handle messages from client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("[SW] Service worker script loaded");
