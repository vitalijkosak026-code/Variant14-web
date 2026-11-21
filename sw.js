const VERSION = "v2";
const SCOPE = self.registration.scope;
const CACHE_PREFIX = `variant14-web:${SCOPE}:`;
const CACHE_NAME = CACHE_PREFIX + VERSION;

const FILES = [
  "./",
  "./index.html",
  "./catalog.html",
  "./form.html",
  "./style.css",
  "./catalog.js",
  "./catalog-page.js",
  './images/item1.png',
  './images/item2.png',
  './images/item3.png'
];

self.addEventListener("install", (event) => {
  const requests = FILES.map((path) =>
    new Request(new URL(path, SCOPE), { cache: "reload" })
  );
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(requests))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      const oldVersions = names.filter((name) =>
        name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME
      );
      return Promise.all(oldVersions.map((name) => caches.delete(name)));
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || !request.url.startsWith(SCOPE)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const savedResponse = await cache.match(request);
      return savedResponse ?? fetch(request);
    })
  );
});
