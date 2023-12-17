var CACHE_STATIC_NAME = 'static-v5';
var CACHE_DYNAMIC_NAME = 'dynamic-v4';

function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

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

this.addEventListener('fetch', function (event) {
  let url = 'https://monitoramento.conafer.org/api/v1/user/detail/';

  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
        return fetch(event.request).then(function (res) {
          cache.put(event.request, res.clone());
          return res;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                trimCache(CACHE_DYNAMIC_NAME, 3);
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(function (err) {
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                return cache.match('/offline.html');
              });
            });
        }
      })
    );
  }
});

// this.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request).then((res) => {
//             return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//               cache.put(event.request.url, res.clone());
//               return res;
//             });
//           });
//         }
//       })
//       .catch(() => {
//         return caches.open(CACHE_STATIC_NAME).then((cache) => {
//           if (event.request.url.indexOf('/offline') > -1) {
//             return cache.match('/offline');
//           }
//         });
//       })
//   );
// });
