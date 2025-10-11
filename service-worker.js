const CACHE_NAME = 'zeyne-shell-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .catch(() => true)
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  const slot = event.notification?.data?.slot || null;
  if (event.action === 'snooze-10') {
    event.waitUntil(handleSnoozeAction(slot));
  } else {
    event.waitUntil(handleOpenAction(slot));
  }
  event.notification.close();
});

async function handleSnoozeAction(slot) {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (clients.length === 0) {
    await self.clients.openWindow('/');
    return;
  }
  clients.forEach(client => {
    client.postMessage({ type: 'NOTIFICATION_SNOOZE', slot });
  });
  await clients[0].focus();
}

async function handleOpenAction(slot) {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (clients.length === 0) {
    await self.clients.openWindow('/');
    return;
  }
  await clients[0].focus();
  clients[0].postMessage({ type: 'NOTIFICATION_OPEN', slot });
}
