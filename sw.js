// /**
//  * @fileoverview Basic service worker script for offline support.
//  * Caches specified assets during installation, removes old caches on activation,
//  * and serves cached assets when offline.
//  */

// const CACHE_NAME = "nash_house_v1";

// /**
//  * List of static assets to cache during the install event.
//  * @constant {string[]}
//  */
// const FILES_TO_CACHE = [
// 	"./",
// 	"./index.html",
// 	"./apple-touch-icon.png",
// 	"./assets/css/colors.css",
// 	"./assets/css/main.css",
// 	"./assets/css/typography.css",
// 	"./assets/js/build.js",
// 	"./assets/js/Event.js",
// 	"./assets/js/eventHandlers.js",
// 	"./assets/js/main.js",
// 	"./assets/js/Media.js",
// 	"./assets/js/News.js",
// 	"./assets/js/render.js",
// 	"./assets/js/theme.js",
// 	"./assets/js/utils.js",
// 	"./assets/media/brand/house-crest.svg",
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
// 									")"
// 							);
// 						}
// 						return cache.put(file, response.clone());
// 					});
// 				})
// 			);
// 		})
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
// 					.map((key) => caches.delete(key))
// 			);
// 		})
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
// 		})
// 	);
// });
// service-worker.js
// const CACHE_VERSION = "v1";
// const PRECACHE = `nash_house-precache-${CACHE_VERSION}`;
// const RUNTIME = `nash_house-runtime-${CACHE_VERSION}`;
// const IMAGE_CACHE = `nash_house-images-${CACHE_VERSION}`;

// // Files you want available offline. Add hashed filenames if you use them in builds.
// const FILES_TO_CACHE = [
// 	"/", // navigation fallback — prefer exact path your app uses, e.g. "/index.html"
// 	"/index.html",
// 	"/offline.html",
// 	"/index.html",
// 	"/apple-touch-icon.png",
// 	"/assets/css/colors.css",
// 	"/assets/css/main.css",
// 	"/assets/css/typography.css",
// 	"/assets/js/build.js",
// 	"/assets/js/Event.js",
// 	"/assets/js/eventHandlers.js",
// 	"/assets/js/main.js",
// 	"/assets/js/Media.js",
// 	"/assets/js/News.js",
// 	"/assets/js/render.js",
// 	"/assets/js/theme.js",
// 	"/assets/js/utils.js",
// 	"/assets/media/brand/house-crest.svg",
// ];

// /**
//  * Helper: fetch with timeout
//  */
// function fetchWithTimeout(request, ms = 4000) {
// 	return new Promise((resolve, reject) => {
// 		const timer = setTimeout(
// 			() => reject(new Error("network-timeout")),
// 			ms
// 		);
// 		fetch(request)
// 			.then((res) => {
// 				clearTimeout(timer);
// 				resolve(res);
// 			})
// 			.catch((err) => {
// 				clearTimeout(timer);
// 				reject(err);
// 			});
// 	});
// }

// /**
//  * Install: pre-cache core assets.
//  * Use Promise.allSettled so one failing resource doesn't block the whole install.
//  */
// self.addEventListener("install", (event) => {
// 	event.waitUntil(
// 		(async () => {
// 			const cache = await caches.open(PRECACHE);
// 			// Use addAll-like behavior but allow partial success (don't fail install for 1 missing file)
// 			const results = await Promise.allSettled(
// 				FILES_TO_CACHE.map((url) =>
// 					fetch(url, { cache: "no-cache" }).then((res) => {
// 						if (!res || !res.ok)
// 							throw new Error(
// 								`Failed to fetch ${url} (${res && res.status})`
// 							);
// 						return cache.put(url, res.clone());
// 					})
// 				)
// 			);
// 			// Optional: log or send telemetry on any failures
// 			const failures = results.filter((r) => r.status === "rejected");
// 			if (failures.length) {
// 				// keep install but log so you can debug missing assets
// 				// console.warn("Some precache entries failed:", failures);
// 			}
// 		})()
// 	);
// 	self.skipWaiting();
// });

// /**
//  * Activate: cleanup old caches.
//  */
// self.addEventListener("activate", (event) => {
// 	const expectedCaches = [PRECACHE, RUNTIME, IMAGE_CACHE];
// 	event.waitUntil(
// 		caches
// 			.keys()
// 			.then((keys) =>
// 				Promise.all(
// 					keys.map((key) => {
// 						if (!expectedCaches.includes(key)) {
// 							return caches.delete(key);
// 						}
// 						return Promise.resolve();
// 					})
// 				)
// 			)
// 			.then(() => self.clients.claim())
// 	);
// });

// /**
//  * Fetch handler:
//  * - Bypass non-GET requests
//  * - Do not cache API calls (identified by path including '/api/')
//  * - Navigation (HTML) => network-first, fallback to precache offline.html
//  * - JS/CSS => network-first with cache fallback
//  * - Images/media => cache-first with background update
//  */
// self.addEventListener("fetch", (event) => {
// 	const request = event.request;

// 	// 1) Ignore non-GET requests
// 	if (request.method !== "GET") {
// 		return event.respondWith(fetch(request));
// 	}

// 	const url = new URL(request.url);

// 	// 2) Never cache API requests (adjust the detection to your API pattern)
// 	if (url.pathname.startsWith("/api/") || url.pathname.includes("/api/")) {
// 		return event.respondWith(
// 			fetch(request).catch((err) => {
// 				// You may return a custom response for offline API behavior if desired.
// 				return new Response(JSON.stringify({ error: "offline" }), {
// 					status: 503,
// 					headers: { "Content-Type": "application/json" },
// 				});
// 			})
// 		);
// 	}

// 	// 3) Navigation requests (HTML pages) — network first, cache fallback (home page works offline)
// 	if (request.mode === "navigate") {
// 		event.respondWith(
// 			(async () => {
// 				try {
// 					const networkResponse = await fetchWithTimeout(
// 						request,
// 						5000
// 					);
// 					// Optionally update runtime cache with latest HTML for offline usage
// 					if (networkResponse && networkResponse.ok) {
// 						const cache = await caches.open(RUNTIME);
// 						// Only cache same-origin basic responses (avoid opaque cross-origin writes)
// 						if (networkResponse.type === "basic") {
// 							cache
// 								.put(request, networkResponse.clone())
// 								.catch(() => {});
// 						}
// 						return networkResponse;
// 					}
// 				} catch (err) {
// 					// network failed or timed out -> fall back to cache
// 				}
// 				const cached = await caches.match(request);
// 				if (cached) return cached;
// 				// finally fall back to offline page
// 				const offline = await caches.match("/offline.html");
// 				return (
// 					offline ||
// 					new Response("You are offline", {
// 						status: 503,
// 						statusText: "Offline",
// 					})
// 				);
// 			})()
// 		);
// 		return;
// 	}

// 	// 4) Static JS/CSS — network-first then cache fallback (so you don't serve outdated code while online)
// 	if (
// 		request.destination === "script" ||
// 		request.destination === "style" ||
// 		/\.(js|css)$/.test(url.pathname)
// 	) {
// 		event.respondWith(
// 			(async () => {
// 				try {
// 					const networkResponse = await fetchWithTimeout(
// 						request,
// 						4000
// 					);
// 					if (networkResponse && networkResponse.ok) {
// 						// cache same-origin basic responses only
// 						if (networkResponse.type === "basic") {
// 							const cache = await caches.open(RUNTIME);
// 							cache
// 								.put(request, networkResponse.clone())
// 								.catch(() => {});
// 						}
// 						return networkResponse;
// 					}
// 				} catch (err) {
// 					// network error/timeouts -> fall back to cache
// 				}
// 				const cached = await caches.match(request);
// 				if (cached) return cached;
// 				// nothing in cache -> try network without timeout (last attempt)
// 				try {
// 					return await fetch(request);
// 				} catch (err) {
// 					return new Response(null, {
// 						status: 504,
// 						statusText: "Gateway Timeout",
// 					});
// 				}
// 			})()
// 		);
// 		return;
// 	}

// 	// 5) Images/media — cache-first with background update
// 	if (
// 		request.destination === "image" ||
// 		/\.(png|jpg|jpeg|svg|gif|webp)$/.test(url.pathname)
// 	) {
// 		event.respondWith(
// 			(async () => {
// 				const cache = await caches.open(IMAGE_CACHE);
// 				const cached = await cache.match(request);
// 				if (cached) {
// 					// trigger an update in background (do not await)
// 					fetch(request)
// 						.then((res) => {
// 							if (res && res.ok && res.type === "basic")
// 								cache.put(request, res.clone()).catch(() => {});
// 						})
// 						.catch(() => {});
// 					return cached;
// 				}
// 				try {
// 					const response = await fetch(request);
// 					if (response && response.ok && response.type === "basic") {
// 						cache.put(request, response.clone()).catch(() => {});
// 					}
// 					return response;
// 				} catch (err) {
// 					// final fallback: maybe return a small inline SVG or a 1x1 transparent image if you have one
// 					return (
// 						caches.match("/offline.html") ||
// 						new Response(null, { status: 503 })
// 					);
// 				}
// 			})()
// 		);
// 		return;
// 	}

// 	// 6) Default: try cache first, then network (safe fallback)
// 	event.respondWith(
// 		caches.match(request).then((cached) => {
// 			if (cached) return cached;
// 			return fetch(request)
// 				.then((res) => {
// 					// don't store opaque cross-origin responses
// 					if (!res || !res.ok || res.type !== "basic") return res;
// 					// optionally cache other assets in runtime cache
// 					const cachePromise = caches
// 						.open(RUNTIME)
// 						.then((cache) => cache.put(request, res.clone()))
// 						.catch(() => {});
// 					return res;
// 				})
// 				.catch(() => {
// 					// network failed — fallback to something useful if available
// 					return (
// 						caches.match("/offline.html") ||
// 						new Response("Offline", { status: 503 })
// 					);
// 				});
// 		})
// 	);
// });

// service-worker.js
const CACHE_VERSION = "v2";
const PRECACHE = `nash_house-precache-${CACHE_VERSION}`;
const RUNTIME = `nash_house-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `nash_house-images-${CACHE_VERSION}`;

// Critical files for offline usage
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
 * Install: precache essential files
 */
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(PRECACHE).then((cache) => cache.addAll(FILES_TO_CACHE))
	);
	self.skipWaiting();
});

/**
 * Activate: cleanup old caches
 */
self.addEventListener("activate", (event) => {
	const expectedCaches = [PRECACHE, RUNTIME, IMAGE_CACHE];
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys.map((key) => {
						if (!expectedCaches.includes(key))
							return caches.delete(key);
						return Promise.resolve();
					})
				)
			)
			.then(() => self.clients.claim())
	);
});

/**
 * Fetch handler
 * - Stale-while-revalidate for JS/CSS and HTML (fast loads, updates in background)
 * - Cache-first for images (fast visual load, updates in background)
 * - Network-only for API calls
 */
self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== "GET") return;

	// Never cache API requests
	if (url.pathname.startsWith("/api/") || url.pathname.includes("/api/")) {
		event.respondWith(
			fetch(request).catch(
				() =>
					new Response(JSON.stringify({ error: "offline" }), {
						status: 503,
						headers: { "Content-Type": "application/json" },
					})
			)
		);
		return;
	}

	// Navigation (HTML pages) - stale-while-revalidate
	if (request.mode === "navigate") {
		event.respondWith(
			(async () => {
				const cache = await caches.open(RUNTIME);
				const cachedResponse = await cache.match(request);
				const networkFetch = fetch(request)
					.then((res) => {
						if (res && res.ok && res.type === "basic")
							cache.put(request, res.clone());
						return res;
					})
					.catch(() => null);
				// Return cached immediately if available, otherwise network
				return (
					cachedResponse ||
					(await networkFetch) ||
					(await caches.match("/offline.html"))
				);
			})()
		);
		return;
	}

	// JS/CSS - stale-while-revalidate
	if (
		request.destination === "script" ||
		request.destination === "style" ||
		/\.(js|css)$/.test(url.pathname)
	) {
		event.respondWith(
			(async () => {
				const cache = await caches.open(RUNTIME);
				const cachedResponse = await cache.match(request);
				const networkFetch = fetch(request)
					.then((res) => {
						if (res && res.ok && res.type === "basic")
							cache.put(request, res.clone());
						return res;
					})
					.catch(() => null);
				return cachedResponse || (await networkFetch);
			})()
		);
		return;
	}

	// Images - cache-first with background update
	if (
		request.destination === "image" ||
		/\.(png|jpg|jpeg|svg|gif|webp)$/.test(url.pathname)
	) {
		event.respondWith(
			(async () => {
				const cache = await caches.open(IMAGE_CACHE);
				const cachedResponse = await cache.match(request);
				const fetchPromise = fetch(request)
					.then((res) => {
						if (res && res.ok && res.type === "basic")
							cache.put(request, res.clone());
					})
					.catch(() => {});
				if (cachedResponse) return cachedResponse;
				await fetchPromise;
				return (
					caches.match(request) || new Response(null, { status: 503 })
				);
			})()
		);
		return;
	}

	// Default fallback: network, then cache
	event.respondWith(
		fetch(request)
			.then((res) => res)
			.catch(() => caches.match(request) || caches.match("/offline.html"))
	);
});
