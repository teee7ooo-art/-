const CACHE_NAME = 'matafi-giza-2026-09-14-v2';
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  // Always get the current page/files from the network when available.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
