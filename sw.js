const CACHE_NAME = "hermitage-shell-v1";
const APP_SHELL = ["/", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  // Keep API and admin/customer data live; never cache database/API responses.
  if (url.pathname.startsWith("/api/")) return;
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).then(response => {
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put("/", response.clone()));
      return response;
    }).catch(() => caches.match("/") ));
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      }
      return response;
    }))
  );
});
