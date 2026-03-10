/**
 * Service Worker — Stale-While-Revalidate with offline fallback.
 * Bump CACHE_NAME (e.g. v9 -> v10) when core HTML/CSS/JS or pre-cached assets change
 * so clients drop old caches on activate.
 */
const CACHE_NAME = 'abhishek-raut-v10';
const ASSETS = [
    './',
    './index.html',
    './offline.html',
    './css/variables.css',
    './css/base.css',
    './css/layout.css',
    './css/components.css',
    './script.js',
    './manifest.json',
    './images/me.png',
    './images/me.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('./offline.html') || caches.match('./index.html') || caches.match('./');
                    }
                    return Promise.reject(new Error('offline'));
                });
            return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
        })
    );
});
