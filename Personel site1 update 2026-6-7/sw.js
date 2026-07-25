const CACHE_NAME = "sadra-cache-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

const CACHE_NAME = "img-cache-v1";

const IMAGE_CACHE = [
    "/img/profile.webp",
    "/img/bg.webp"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(IMAGE_CACHE))
    );
});