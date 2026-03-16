/** Bump CACHE_NAME when core assets change so clients drop old caches. */
const CACHE_NAME = 'abhishek-raut-v11';
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
        caches.open(CACHE_NAME).then((cache) => Promise.allSettled(ASSETS.map((asset) => cache.add(asset))))
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
    if (event.request.method !== 'GET') {
        return;
    }
    if (new URL(event.request.url).origin !== self.location.origin) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Cache only core resource types to avoid unbounded growth
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const cacheableDestinations = ['document', 'script', 'style', 'image', 'font'];
                    if (cacheableDestinations.includes(event.request.destination)) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                }
                return networkResponse;
            }).catch(() => {
                // Navigation: try offline.html, then index.html, then root (Promise chain, not ||)
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html')
                        .then((r) => r || caches.match('./index.html'))
                        .then((r) => r || caches.match('./'));
                }
                return Promise.reject(new Error('offline'));
            });
            return cachedResponse || fetchPromise;
        })
    );
});
