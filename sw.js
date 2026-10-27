/**
 * @fileoverview Advanced service worker script for robust offline support.
 * Implements Stale-While-Revalidate, Network-First, and Cache-First strategies.
 */

const CACHE_VERSION = "v2";
const STATIC_CACHE = `nash_house-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `nash_house-dynamic-${CACHE_VERSION}`;
const BASE_PATH = "/nash_house";

/**
 * List of core static assets to precache.
 * @constant {string[]}
 */
const FILES_TO_CACHE = [
	`${BASE_PATH}/`, // Cache the root path
	`${BASE_PATH}/index.html`,
	`${BASE_PATH}/offline.html`,
	`${BASE_PATH}/apple-touch-icon.png`,
	`${BASE_PATH}/assets/css/colors.css`,
	`${BASE_PATH}/assets/css/main.css`,
	`${BASE_PATH}/assets/css/typography.css`,
	`${BASE_PATH}/assets/js/build.js`,
	`${BASE_PATH}/assets/js/Event.js`,
	`${BASE_PATH}/assets/js/eventHandlers.js`,
	`${BASE_PATH}/assets/js/main.js`,
	`${BASE_PATH}/assets/js/Media.js`,
	`${BASE_PATH}/assets/js/News.js`,
	`${BASE_PATH}/assets/js/render.js`,
	`${BASE_PATH}/assets/js/theme.js`,
	`${BASE_PATH}/assets/js/utils.js`,
	`${BASE_PATH}/assets/media/brand/house-crest.svg`,
];

/**
 * Install Event: Precaches essential static assets.
 */
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE).then((cache) => {
			return Promise.all(
				FILES_TO_CACHE.map((file) => {
					return fetch(file).then((response) => {
						if (!response.ok) {
							throw new Error(
								`Failed: ${file} (${response.status})`,
							);
						}
						return cache.put(file, response.clone());
					});
				}),
			);
		}),
	);
	self.skipWaiting();
});

/**
 * Activate Event: Cleans up old static and dynamic caches.
 */
self.addEventListener("activate", (event) => {
	const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!currentCaches.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
	self.clients.claim();
});

/**
 * Fetch Event: Routes requests to specific caching strategies.
 */
self.addEventListener("fetch", (event) => {
	const { request } = event;

	// Ignore non-GET requests (e.g., POST, PUT, DELETE cannot be cached)
	if (request.method !== "GET") return;

	// 1. HTML Requests: Network-First Strategy with Offline Fallback
	if (
		request.mode === "navigate" ||
		request.headers.get("accept").includes("text/html")
	) {
		event.respondWith(
			fetch(request)
				.then((networkResponse) => {
					// Dynamically cache the latest HTML version
					return caches.open(DYNAMIC_CACHE).then((cache) => {
						cache.put(request, networkResponse.clone());
						return networkResponse;
					});
				})
				.catch(() => {
					// If network fails, try the cache. If not in cache, serve offline.html
					return caches.match(request).then((cachedResponse) => {
						return (
							cachedResponse ||
							caches.match(`${BASE_PATH}/offline.html`)
						);
					});
				}),
		);
		return;
	}

	// 2. CSS & JS Requests: Stale-While-Revalidate Strategy
	if (request.destination === "style" || request.destination === "script") {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				const fetchPromise = fetch(request)
					.then((networkResponse) => {
						caches.open(STATIC_CACHE).then((cache) => {
							cache.put(request, networkResponse.clone());
						});
						return networkResponse;
					})
					.catch(() => {
						// Fails silently if offline, relies entirely on cache
					});

				// Return cached immediately if available, while updating in the background
				return cachedResponse || fetchPromise;
			}),
		);
		return;
	}

	// 3. Image Requests: Cache-First Strategy with Dynamic Caching
	if (request.destination === "image") {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse; // Return instantly from cache
				}
				// If not in cache, fetch from network and save to dynamic cache
				return fetch(request).then((networkResponse) => {
					return caches.open(DYNAMIC_CACHE).then((cache) => {
						cache.put(request, networkResponse.clone());
						return networkResponse;
					});
				});
			}),
		);
		return;
	}

	// 4. Default Fallback: Cache-First Strategy for everything else
	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			return cachedResponse || fetch(request);
		}),
	);
});

// /**
//  * @fileoverview Basic service worker script for offline support.
//  * Caches specified assets during installation, removes old caches on activation,
//  * and serves cached assets when offline.
//  */

// const CACHE_NAME = "nash_house-cache-v1";

// const BASE_PATH = "/nash_house";

// /**
//  * List of static assets to cache during the install event.
//  * @constant {string[]}
//  */
// const FILES_TO_CACHE = [
// 	`${BASE_PATH}/index.html`,
// 	`${BASE_PATH}/offline.html`,
// 	`${BASE_PATH}/apple-touch-icon.png`,
// 	`${BASE_PATH}/assets/css/colors.css`,
// 	`${BASE_PATH}/assets/css/main.css`,
// 	`${BASE_PATH}/assets/css/typography.css`,
// 	`${BASE_PATH}/assets/js/build.js`,
// 	`${BASE_PATH}/assets/js/Event.js`,
// 	`${BASE_PATH}/assets/js/eventHandlers.js`,
// 	`${BASE_PATH}/assets/js/main.js`,
// 	`${BASE_PATH}/assets/js/Media.js`,
// 	`${BASE_PATH}/assets/js/News.js`,
// 	`${BASE_PATH}/assets/js/render.js`,
// 	`${BASE_PATH}/assets/js/theme.js`,
// 	`${BASE_PATH}/assets/js/utils.js`,
// 	`${BASE_PATH}/assets/media/brand/house-crest.svg`,
// ];

// /**
//  * Install event handler.
//  * Caches all files listed in FILES_TO_CACHE.
//  *
//  * @param {ExtendableEvent} event - The install event.
//  */
// self.addEventListener("install", function (event) {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then(function (cache) {
// 			return Promise.all(
// 				FILES_TO_CACHE.map(function (file) {
// 					return fetch(file).then(function (response) {
// 						if (!response.ok) {
// 							throw new Error(
// 								"Request failed for: " +
// 									file +
// 									" (" +
// 									response.status +
// 									")",
// 							);
// 						}
// 						return cache.put(file, response.clone());
// 					});
// 				}),
// 			);
// 		}),
// 	);
// 	self.skipWaiting();
// });

// /**
//  * Activate event handler.
//  * Removes old caches that don’t match the current CACHE_NAME.
//  *
//  * @param {ExtendableEvent} event - The activate event.
//  */
// self.addEventListener("activate", function (event) {
// 	event.waitUntil(
// 		caches.keys().then(function (keys) {
// 			return Promise.all(
// 				keys
// 					.filter((key) => key !== CACHE_NAME)
// 					.map((key) => caches.delete(key)),
// 			);
// 		}),
// 	);
// 	self.clients.claim(); // Takes control of uncontrolled clients as soon as it activates.
// });

// /**
//  * Fetch event handler.
//  * Responds with cached resources when available, otherwise fetches from the network.
//  *
//  * @param {FetchEvent} event - The fetch event.
//  */
// self.addEventListener("fetch", function (event) {
// 	event.respondWith(
// 		caches.match(event.request).then(function (response) {
// 			return response || fetch(event.request);
// 		}),
// 	);
// });
