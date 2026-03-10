const CACHE_NAME = 'abhishek-raut-v9';
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

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Activate Event
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
        })
    );
});

// Fetch Event - Stale-While-Revalidate with Offline Fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Only cache successful responses
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If both fail, and it's a navigation request, show offline page
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html');
                }
            });
            return cachedResponse || fetchPromise;
        })
    );
});
