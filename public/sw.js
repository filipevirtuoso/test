this.addEventListener('install', (event) => {
  this.skipWaiting();

  event.waitUntil(
    caches.open('test').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/static/js/0.chunk.js',
        '/static/js/main.chunk.js',
        '/manifest.json',
        '/favicon.ico',
        '/logo192.png',
        '/logo512.png',
        '/static/media/logo.5d5d9eef.svg',
        '/addevent',
      ]);
    })
  );
});

// Serve from Cache
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/addevent');
      })
  );
});
