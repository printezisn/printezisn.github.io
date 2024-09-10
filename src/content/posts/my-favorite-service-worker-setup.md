---
title: My favorite service worker setup
description: My favorite service worker setup that I use in order to cache static content and provide offline experience
excerpt: My favorite service worker setup that I use in order to cache static content and provide offline experience
categories:
  - js
date: 2024-09-10
---

Here is a description of service workers, as depicted in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" target="_blank" rel="noreferrer">MDN</a>:

```
Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available).
They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests, and
take appropriate action based on whether the network is available, and update assets residing on the server. They will also allow
access to push notifications and background sync APIs.
```

The first time I set my eyes on service workers, I thought how cool it would be to cache static content as much as I like and not rely on the server. Nowadays, static resources (js, css, images, etc.) are cache busted, meaning that they have a unique name based on their content. So it's not expected for a static resource to change. So why not cache it forever ?

Also, many of my apps are games, so it would be cool if I could access the offline. The subway means <a href="/sudoku" target="_blank">sudoku</a> to me.

---

Here's how service workers cover those needs:

- If the request is about a static resource (js, css, images, etc.), the service worker checks if it's already in the cache. If yes, it returns it, otherwise it fetches it from the server, caches it and then returns it.
- For requests which have to do with retrieving information (mostly GET requests), it passes the request straight to the server, caches the result and returns it. If the request fails though, it checks if the result is in the cache and if it is, it returns it.

This way, I manage to keep static resources cached and provide basic offline experience for static generated content like this blog.

Here's the snippet of a `service-worker.js` file (placed in the **public** directory):

```js
const cacheName = '<my-cache-name>-v1';

const deleteOldCaches = async () => {
  const keys = await caches.keys();
  await Promise.allSettled(
    keys.map(async (key) => {
      if (key !== cacheName) return;

      await caches.delete(key);
    }),
  );
};

self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches());
});

const cacheFirst = async (event) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(event.request);
  if (cachedResponse) return cachedResponse;

  const fetchResponse = await fetch(event.request);
  if (fetchResponse.status < 300) {
    cache.put(event.request, fetchResponse.clone());
  }

  return fetchResponse;
};

const networkFirst = async (event) => {
  const cache = await caches.open(cacheName);

  try {
    const fetchResponse = await fetch(event.request);
    if (fetchResponse.status < 300) {
      cache.put(event.request, fetchResponse.clone());
    }

    return fetchResponse;
  } catch {
    const cachedReponse = await cache.match(event.request);
    if (cachedReponse) {
      return cachedReponse;
    }
  }
};

self.addEventListener('fetch', async (event) => {
  if (!event.request.url.startsWith('http')) return;

  const cacheFirstDestinations = [
    'script',
    'image',
    'font',
    'manifest',
    'style',
  ];

  if (cacheFirstDestinations.includes(event.request.destination)) {
    await event.respondWith(cacheFirst(event));
  } else if (event.request.method === 'GET') {
    await event.respondWith(networkFirst(event));
  }
});
```

You can register it as follows (in any `js` file or page):

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```
