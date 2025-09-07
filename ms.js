// Nama cache
const CACHE_NAME = "fzstore-cache-v1";

// File yang mau disimpan di cache
const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/pembayaran.html",
  "/manifest.json",
  "/sw.js",
  "/img/icon-192.png",
  "/img/icon-512.png"
];

// Install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resource
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Kalau ada di cache → pakai cache, kalau enggak → ambil dari internet
      return response || fetch(event.request);
    })
  );
});

// Update cache kalau ada versi baru
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Cache lama dihapus:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});