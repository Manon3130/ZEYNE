const CACHE_NAME = 'ZEYNE_CACHE_V1';
const PRECACHE_URLS = [
  './index.html',
  './style.css',
  './app.js',
  './assets/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const { request } = event;

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
    return;
  }

  if (['style', 'script', 'image'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(event, request));
    return;
  }

  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

self.addEventListener('notificationclick', (event) => {
  const slot = event.notification?.data?.slot ?? null;
  if (event.action === 'snooze-10') {
    event.waitUntil(handleSnoozeAction(slot));
  } else {
    event.waitUntil(handleOpenAction(slot));
  }
  event.notification.close();
});

async function handleDocumentRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const fallback = await cache.match('./index.html');
    if (fallback) {
      return fallback;
    }
    throw error;
  }
}

async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  if (cachedResponse) {
    event.waitUntil(networkPromise);
    return cachedResponse;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) {
    return networkResponse;
  }
  throw new Error('Network request failed and no cache entry available.');
}

async function handleSnoozeAction(slot) {
  const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (clientsList.length === 0) {
    await self.clients.openWindow('./');
    return;
  }
  clientsList.forEach((client) => {
    client.postMessage({ type: 'NOTIFICATION_SNOOZE', slot });
  });
  await clientsList[0].focus();
}

async function handleOpenAction(slot) {
  const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (clientsList.length === 0) {
    await self.clients.openWindow('./');
    return;
  }
  await clientsList[0].focus();
  clientsList[0].postMessage({ type: 'NOTIFICATION_OPEN', slot });
}
