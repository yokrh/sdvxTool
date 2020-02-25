// configuration
const version = '1.0.8';
const CACHE = version + '::sdvxYokrhPWA';
const installFilesEssential = [
  '/',
  '/manifest.json',
  '/css/app.bundle.css',
  '/js/app.bundle.js'
];
const installFilesDesirable = [
  '/favicon.ico'
];
const filesNotToCache = [
  '/data/15.json',
  '/data/16.json',
  '/data/17.json',
  '/data/18.json',
  '/data/19.json',
  '/data/20.json',
  '/data/weekly.json',
  '/data/quiz.json'
]

// install static assets
function installStaticFiles() {
  return caches.open(CACHE)
    .then(cache => {
      // cache desirable files
      cache.addAll(installFilesDesirable);
      // cache essential files
      return cache.addAll(installFilesEssential);
    });
}

// clear old caches
function clearOldCaches() {
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    });
}

// application installation
self.addEventListener('install', event => {
  // cache core files
  event.waitUntil(
    installStaticFiles()
    .then(() => self.skipWaiting())
  );
});


// application activated
self.addEventListener('activate', event => {
	// delete old caches
  event.waitUntil(
    clearOldCaches()
    .then(() => self.clients.claim())
	);
});


// application fetch network data
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // abandon http request
  if (url.startsWith('http://')) return;
  // abandon non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE)
      .then(cache => {
        return cache.match(event.request)
          .then(cachedFile => {
            if (cachedFile) {
              // return cached file
              return cachedFile;
            }
            // make network request
            return fetch(event.request)
              .then(response => {
                // cache new file
                if (response.ok && !filesNotToCache.some(filePath => url.endsWith(filePath))) {
                  cache.put(event.request, response.clone());
                }
                return response;
              })
              // app is offline
              .catch(() => {
                Promise.reject('ServiceWorker:: App is offline or connection is unstable. Some functions are restricted.');
              });
          });
      })
  );
});
