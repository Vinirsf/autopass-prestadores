self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Ativado');
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});
