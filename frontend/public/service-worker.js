/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


// Modified fetch event handler
self.addEventListener("fetch", event => {
  const checkurl = event.request.url;

  if (checkurl.includes("/oauth2")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For other requests, follow the cache-then-network strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});