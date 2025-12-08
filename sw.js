// /**
//  * @fileoverview Basic service worker script for offline support.
//  * Caches specified assets during installation, removes old caches on activation,
//  * and serves cached assets when offline.
//  */
const CACHE_VERSION = "v1";
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
