if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/nash_house/sw.js")
		.then(() => console.log("✅ Service Worker registered"))
		.catch((err) => console.error("❌ Service Worker failed:", err));
}

import { setupTheme } from "./theme.js";
import { handleEventListeners } from "./eventHandlers.js";
import { render } from "./render.js";
import { setupNewsFilter, setupMediaFilter, initFilters } from "./utils.js";

setupTheme();
handleEventListeners();
render();

if (
	!localStorage.getItem("media-filter") &&
	!localStorage.getItem("news-filter")
) {
	initFilters();
}

if (document.querySelector('[data-page="news"]')) {
	setupNewsFilter();
}

if (document.querySelector('[data-page="gallery"]')) {
	setupMediaFilter();
}
