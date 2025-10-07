self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
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
