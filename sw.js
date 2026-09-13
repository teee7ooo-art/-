const CACHE = "matafi-giza-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  // Keep the app shell available; map tiles and geocoding remain online.
  if (e.request.method === "GET" && new URL(e.request.url).origin === location.origin) {
    e.respondWith(caches.open(CACHE).then(c =>
      c.match(e.request).then(r => r || fetch(e.request).then(x => {
        c.put(e.request, x.clone()); return x;
      }))
    ));
  }
});
