self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("kitty-cache").then(cache => {
      return cache.addAll([
        "/",
        "index.html",
        "style/style.css",
        "script/script.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
