var CACHE_STATIC_NAME = 'static-v5';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

this.addEventListener('install', (event) => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('[Service Worker] Precaching App Shell');
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/static/js/0.chunk.js',
        '/static/js/main.chunk.js',
        '/manifest.json',
        '/favicon.ico',
        '/logo512.png',
        '/static/media/logo.5d5d9eef.svg',
        '/addevent',
        '/offline',
        'https://db.onlinewebfonts.com/c/be167b60b37c7f9cd47a1b0fdb248cf5?family=Arboria-Bold',
      ]);
    })
  );
});

this.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (![CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME].includes(key)) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  event.waitUntil(this.clients.claim());
});

// Serve from Cache
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then((res) => {
            return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      })
      .catch(() => {
        return caches.open(CACHE_STATIC_NAME).then((cache) => {
          if (event.request.url.indexOf('/offline') > -1) {
            return cache.match('/offline');
          }
        });
      })
  );
});
