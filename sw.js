const CACHE_NAME = "dashboard-cache-v1";
const FILES_TO_CACHE = [
  "/dashboard_cachaing/sw.js",
  "/dashboard_cachaing/manifest.json",
  "/dashboard_cachaing/index.html",
  "/dashboard_cachaing/login.html",
  "/dashboard_cachaing/show.html",
  "/dashboard_cachaing/Add.html",
  "/dashboard_cachaing/css/style.css",
  "/dashboard_cachaing/css/all.min.css",
  "/dashboard_cachaing/js/main.js",
  "/dashboard_cachaing/js/all.min.js",
  "/dashboard_cachaing/image/avatar.png",
  "/dashboard_cachaing/image/icon.png",
  "/dashboard_cachaing/image/tiger.jpg",
  "/dashboard_cachaing/image/user.webp",
  "/dashboard_cachaing/webfonts/fa-brands-400.ttf",
  "/dashboard_cachaing/webfonts/fa-regular-400.woff2",
  "/dashboard_cachaing/webfonts/fa-solid-900.ttf",
  "/dashboard_cachaing/webfonts/fa-regular-400.ttf",
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
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // إذا كان هناك استجابة مخزنة، يتم إرجاعها مباشرةً
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // تحديث الكاش بالملف الجديد
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch(() => cachedResponse); // في حالة عدم توفر الإنترنت، ارجع إلى الكاش

        return cachedResponse || fetchPromise;
      });
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
