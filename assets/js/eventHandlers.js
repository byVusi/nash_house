import { toggleTheme } from "./theme.js";
import { filterNewsCards, filterMedia } from "./utils.js";

const themeDropdownMenu = document.querySelector(".theme");
export const newsFilterOptionItem = document.querySelector(
	'[data-page="news"] aside ul'
);
export const mediaFilterOptionItem = document.querySelector(
	'[data-page="gallery"] aside ul'
);

const page = document.querySelector("[data-page]").dataset.page;

export function handleEventListeners() {
	// Choose between light and dark modes
	themeDropdownMenu.addEventListener("click", toggleTheme);

	if (page === "news") {
		// Filter the news cards
		newsFilterOptionItem.addEventListener("click", filterNewsCards);
	}

	if (page === "gallery") {
		// Filter the news cards
		mediaFilterOptionItem.addEventListener("click", filterMedia);
	}
}
