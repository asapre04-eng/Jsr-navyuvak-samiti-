const CACHE_NAME = "samiti-v2"; // 🔥 version change करते रहना

// install
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 तुरंत नया version activate
});

// activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔥 old cache delete
          }
        })
      );
    })
  );

  self.clients.claim(); // 🔥 तुरंत control
});

// fetch (NO CACHE → हमेशा fresh code)
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
