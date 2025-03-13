const CACHE_NAME = "dashboard-cache-v1";
const FILES_TO_CACHE = [
  "/dashboard_caching/sw.js",
  "/dashboard_caching/manifest.json",
  "/dashboard_caching/index.html",
  "/dashboard_caching/login.html",
  "/dashboard_caching/show.html",
  "/dashboard_caching/Add.html",
  "/dashboard_caching/css/style.css",
  "/dashboard_caching/css/all.min.css",
  "/dashboard_caching/js/main.js",
  "/dashboard_caching/js/all.min.js",
  "/dashboard_caching/image/avatar.png",
  "/dashboard_caching/image/icon.png",
  "/dashboard_caching/image/tiger.jpg",
  "/dashboard_caching/image/user.webp",
  "/dashboard_caching/webfonts/fa-brands-400.ttf",
  "/dashboard_caching/webfonts/fa-regular-400.woff2",
  "/dashboard_caching/webfonts/fa-solid-900.ttf",
  "/dashboard_caching/webfonts/fa-regular-400.ttf",
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// جلب الملفات من الكاش عند عدم وجود إنترنت

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((network) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, network.clone());
            return network;
          });
        })
      );
    })
  );
});

// تحديث الكاش عند وجود إصدار جديد
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
