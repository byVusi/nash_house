/**
 * @fileoverview Basic service worker script for offline support.
 * Caches specified assets during installation, removes old caches on activation,
 * and serves cached assets when offline.
 */

const CACHE_NAME = "nash_house-cache-v1";

/**
 * List of static assets to cache during the install event.
 * @constant {string[]}
 */
const FILES_TO_CACHE = [
	"/",
	"/index.html",
	"/offline.html",
	"/index.html",
	"/apple-touch-icon.png",
	"/assets/css/colors.css",
	"/assets/css/main.css",
	"/assets/css/typography.css",
	"/assets/js/build.js",
	"/assets/js/Event.js",
	"/assets/js/eventHandlers.js",
	"/assets/js/main.js",
	"/assets/js/Media.js",
	"/assets/js/News.js",
	"/assets/js/render.js",
	"/assets/js/theme.js",
	"/assets/js/utils.js",
	"/assets/media/brand/house-crest.svg",
];

/**
 * Install event handler.
 * Caches all files listed in FILES_TO_CACHE.
 *
 * @param {ExtendableEvent} event - The install event.
 */
self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return Promise.all(
				FILES_TO_CACHE.map(function (file) {
					return fetch(file).then(function (response) {
						if (!response.ok) {
							throw new Error(
								"Request failed for: " +
									file +
									" (" +
									response.status +
									")"
							);
						}
						return cache.put(file, response.clone());
					});
				})
			);
		})
	);
	self.skipWaiting();
});

/**
 * Activate event handler.
 * Removes old caches that don’t match the current CACHE_NAME.
 *
 * @param {ExtendableEvent} event - The activate event.
 */
self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(
				keys
					.filter((key) => key !== CACHE_NAME)
					.map((key) => caches.delete(key))
			);
		})
	);
	self.clients.claim(); // Takes control of uncontrolled clients as soon as it activates.
});

/**
 * Fetch event handler.
 * Responds with cached resources when available, otherwise fetches from the network.
 *
 * @param {FetchEvent} event - The fetch event.
 */
self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
