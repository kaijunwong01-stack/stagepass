const CACHE_NAME = "stagepass-shell-v1";

const APP_SHELL_URLS = [
  "/",
  "/offline",
  "/icon-192.png",
  "/icon-512.png",
];

// Runs once, when the service worker is first installed.
// We pre-cache the app shell files here.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_URLS))
  );
});

// Runs when a new version of the service worker takes over.
// We clean up old caches from previous versions here.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Runs every time the browser makes a network request while on our site.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // If the network request fails (offline), try the cache instead.
      return caches.match(event.request).then((cached) => {
        return cached || caches.match("/offline");
      });
    })
  );
});