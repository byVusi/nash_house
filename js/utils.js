import { handleItemSection, news, media } from "./render.js";
import { buildNewsCard, buildMedia } from "./build.js";

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const categorisedNews = {
	"last 7 days": [],
	"last 2 weeks": [],
	"this month": [],
	"last month": [],
	"this term": [],
	"last term": [],
	"this year": [],
	"previous years": [],
};

export const categorisedMedia = {
	"last 7 days": [],
	"last 2 weeks": [],
	"this month": [],
	"last month": [],
	"this term": [],
	"last term": [],
	"this year": [],
	"previous years": [],
};

export const categorisedEvents = {
	"this month": [],
	easter: [],
	trinity: [],
	michaelmas: [],
};

export const newsFilterListItems = document.querySelectorAll(
	'[data-page="news"] aside ul li'
);

export const mediaFilterListItems = document.querySelectorAll(
	'[data-page="gallery"] aside ul li'
);

export function formatDay(day) {
	return day < 10 ? "0" + day : day;
}

export function sortObjectsByDate(arr, dateKey, direction) {
	return direction
		? arr.sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]))
		: arr.sort((a, b) => new Date(b[dateKey]) - new Date(a[dateKey]));
}

export function createPlaceholder(message) {
	const placeholder = document.createElement("p");
	const page = document.querySelector("[data-page]").dataset.page;

	if (page === "events") {
		placeholder.style = "text-align: left; color: var(--gray-400); flex: 1;";
	}

	if (page === "news") {
		placeholder.style =
			"font-size: clamp(1rem, 2vw, 1.25rem); text-align: center; color: var(--gray-400); flex: 1;";
	}

	if (page === "gallery") {
		placeholder.style =
			"font-size: clamp(1rem, 2vw, 1.25rem); text-align: center; color: var(--gray-400); flex: 1;";
	}

	placeholder.textContent = message;
	return placeholder;
}

export function filterNewsCards(event) {
	const clickedItem = event.target.closest("li");
	if (!clickedItem) {
		console.warn("[News Card Filter] Clicked item is not a valid item.");
		return;
	}

	const clickedItemTextContent = clickedItem.textContent.trim().toLowerCase();
	if (
		![
			"last 7 days",
			"last 2 weeks",
			"this month",
			"last month",
			"this term",
			"last term",
			"this year",
			"previous years",
		].includes(clickedItemTextContent)
	) {
		console.warn("[News Card Filter] Invalid item selected.");
		return;
	}

	// Remove .active from all
	newsFilterListItems.forEach((item) => {
		item.classList.remove("active");
	});

	// Add .active to clicked
	clickedItem.classList.add("active");

	// Save selected theme in localStorage
	localStorage.setItem("news-filter", clickedItemTextContent);

	return clickedItemTextContent;
}

export function filterMedia(event) {
	const clickedItem = event.target.closest("li");
	if (!clickedItem) {
		console.warn("[Media Filter] Clicked item is not a valid item.");
		return;
	}

	const clickedItemTextContent = clickedItem.textContent.trim().toLowerCase();
	if (
		![
			"last 7 days",
			"last 2 weeks",
			"this month",
			"last month",
			"this term",
			"last term",
			"this year",
			"previous years",
		].includes(clickedItemTextContent)
	) {
		console.warn("[Media Filter] Invalid item selected.");
		return;
	}

	// Remove .active from all
	mediaFilterListItems.forEach((item) => {
		item.classList.remove("active");
	});

	// Add .active to clicked
	clickedItem.classList.add("active");

	// Save selected theme in localStorage
	localStorage.setItem("media-filter", clickedItemTextContent);

	return clickedItemTextContent;
}

export function setupNewsFilter() {
	const storedItem = localStorage.getItem("news-filter");

	if (!storedItem) {
		console.warn("[News Card Filter] No item has been found in local storage.");
		return;
	}

	handleItemSection(
		news,
		categorisedNews[storedItem],
		buildNewsCard,
		"No news available"
	);

	newsFilterListItems.forEach((item) => {
		item.classList.remove("active");
	});

	newsFilterListItems.forEach((item) => {
		const itemTextContent = item.textContent.toLowerCase();
		if (itemTextContent === storedItem) {
			item.classList.add("active");
		}
	});
}

export function setupMediaFilter() {
	const storedItem = localStorage.getItem("media-filter");

	if (!storedItem) {
		console.warn("[Media Filter] No item has been found in local storage.");
		return;
	}

	handleItemSection(
		media,
		categorisedMedia[storedItem],
		buildMedia,
		"No media available"
	);

	mediaFilterListItems.forEach((item) => {
		item.classList.remove("active");
	});

	mediaFilterListItems.forEach((item) => {
		const itemTextContent = item.textContent.toLowerCase();
		if (itemTextContent === storedItem) {
			item.classList.add("active");
		}
	});
}
