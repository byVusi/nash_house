import { setupTheme } from "./theme.js";
import { handleEventListeners } from "./eventHandlers.js";
import { render } from "./render.js";
import { setupNewsFilter, setupMediaFilter } from "./utils.js";

setupTheme();
handleEventListeners();
render();

if (document.querySelector('[data-page="news"]')) {
	setupNewsFilter();
}

if (document.querySelector('[data-page="gallery"]')) {
	setupMediaFilter();
}
