import { sortedEvents } from "./Event.js";
import { sortedNews } from "./News.js";
import { sortedMedia } from "./Media.js";
import {
	buildFeaturedEventCard,
	buildNewsCard,
	buildEventCard,
	buildMedia,
} from "./build.js";

import {
	createPlaceholder,
	categorisedEvents,
	categorisedNews,
	categorisedMedia,
} from "./utils.js";

import {
	newsFilterOptionItem,
	mediaFilterOptionItem,
} from "./eventHandlers.js";

// HTML ELEMENTS
export const page = document.querySelector("[data-page]");
const featuredEvents = document.querySelector(
	'[data-page="home"] .event-cards'
);
const recentNews = document.querySelector('[data-page="home"] .news-cards');
export const news = document.querySelector('[data-page="news"] .news-cards');
export const media = document.querySelector(
	'[data-page="gallery"] .media-cards'
);

const thisMonthEvents = document.querySelector(
	'[data-page="events"] #this-month-events'
);
const easterEvents = document.querySelector(
	'[data-page="events"] #easter-events'
);
const trinityEvents = document.querySelector(
	'[data-page="events"] #trinity-events'
);
const michaelmasEvents = document.querySelector(
	'[data-page="events"] #michaelmas-events'
);

export function renderCards(container, buildFn, array, numOfCards) {
	if (!container) {
		console.error(
			"Oops! Container[" + container + "] does not exist. No action taken."
		);
		return;
	}

	for (let i = 0; i < numOfCards; i++) {
		container.appendChild(buildFn(array[i]));
	}
}

// Helper function to handle event rendering or placeholder addition
export function handleItemSection(container, array, buildCardFn, message) {
	if (array.length === 0) {
		container.appendChild(createPlaceholder(message));
	} else {
		renderCards(container, buildCardFn, array, array.length);
	}
}

function categoriseEvents() {
	const currentMonth = new Date().getMonth();

	sortedEvents.forEach((e) => {
		const month = new Date(e.date).getMonth();
		if (month === currentMonth) {
			categorisedEvents["this month"].push(e);
		} else if (month < 5) {
			categorisedEvents["easter"].push(e);
		} else if (month >= 5 && month < 9) {
			categorisedEvents["trinity"].push(e);
		} else {
			categorisedEvents["michaelmas"].push(e);
		}
	});
}

function filterNews() {
	// Get the current date and related time frames
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth(); // 0-11 (Jan-Dec)
	const currentYear = currentDate.getFullYear();

	// Utility function to check if the date is within a specific range (in days)
	const isWithinRange = (date, days) => {
		const diffInDays = Math.floor(
			(currentDate - new Date(date)) / (1000 * 60 * 60 * 24)
		);
		return diffInDays >= 0 && diffInDays <= days;
	};

	sortedNews.forEach((newsItem) => {
		const newsDate = new Date(newsItem.date);
		const newsMonth = newsDate.getMonth();
		const newsYear = newsDate.getFullYear();

		// Last 7 days
		if (isWithinRange(newsItem.date, 7)) {
			categorisedNews["last 7 days"].push(newsItem);
		}

		// Last 14 days
		if (isWithinRange(newsItem.date, 14)) {
			categorisedNews["last 2 weeks"].push(newsItem);
		}

		// This month
		if (newsMonth === currentMonth && newsYear === currentYear) {
			categorisedNews["this month"].push(newsItem);
		}

		// Last month
		if (
			(newsMonth === currentMonth - 1 && newsYear === currentYear) ||
			(currentMonth === 0 && newsMonth === 11 && newsYear === currentYear - 1)
		) {
			categorisedNews["last month"].push(newsItem);
		}

		// This term (Jan - Apr = 1st term, May - Aug = 2nd term, Sep - Dec = 3rd term)
		if (
			newsMonth >= 0 &&
			newsMonth <= 3 &&
			newsYear === currentYear // 1st term (Jan-Apr)
		) {
			categorisedNews["this term"].push(newsItem);
		} else if (
			newsMonth >= 4 &&
			newsMonth <= 7 &&
			newsYear === currentYear // 2nd term (May-Aug)
		) {
			categorisedNews["this term"].push(newsItem);
		} else if (
			newsMonth >= 8 &&
			newsMonth <= 11 &&
			newsYear === currentYear // 3rd term (Sep-Dec)
		) {
			categorisedNews["this term"].push(newsItem);
		}

		// Last term (Previous term based on academic calendar)
		if (
			(newsMonth >= 4 && newsMonth <= 7 && newsYear === currentYear) || // 2nd term was last term (May-Aug)
			(newsMonth >= 8 && newsMonth <= 11 && newsYear === currentYear - 1) // 3rd term was last term (Sep-Dec)
		) {
			categorisedNews["last term"].push(newsItem);
		} else if (
			newsMonth >= 0 &&
			newsMonth <= 3 &&
			newsYear === currentYear - 1 // 1st term was last term (Jan-Apr)
		) {
			categorisedNews["last term"].push(newsItem);
		}

		// This year
		if (newsYear === currentYear) {
			categorisedNews["this year"].push(newsItem);
		}

		// Previous years
		if (newsYear < currentYear) {
			categorisedNews["previous years"].push(newsItem);
		}
	});
}

function filterMedia() {
	// Get the current date and related time frames
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth(); // 0-11 (Jan-Dec)
	const currentYear = currentDate.getFullYear();

	// Utility function to check if the date is within a specific range (in days)
	const isWithinRange = (date, days) => {
		const diffInDays = Math.floor(
			(currentDate - new Date(date)) / (1000 * 60 * 60 * 24)
		);
		return diffInDays >= 0 && diffInDays <= days;
	};

	sortedMedia.forEach((mediaItem) => {
		const mediaDate = new Date(mediaItem.date);
		const mediaMonth = mediaDate.getMonth();
		const mediaYear = mediaDate.getFullYear();

		// Last 7 days
		if (isWithinRange(mediaItem.date, 7)) {
			categorisedMedia["last 7 days"].push(mediaItem);
		}

		// Last 14 days
		if (isWithinRange(mediaItem.date, 14)) {
			categorisedMedia["last 2 weeks"].push(mediaItem);
		}

		// This month
		if (mediaMonth === currentMonth && mediaYear === currentYear) {
			categorisedMedia["this month"].push(mediaItem);
		}

		// Last month
		if (
			(mediaMonth === currentMonth - 1 && mediaYear === currentYear) ||
			(currentMonth === 0 && mediaMonth === 11 && mediaYear === currentYear - 1)
		) {
			categorisedMedia["last month"].push(mediaItem);
		}

		// This term (Jan - Apr = 1st term, May - Aug = 2nd term, Sep - Dec = 3rd term)
		if (
			mediaMonth >= 0 &&
			mediaMonth <= 3 &&
			mediaYear === currentYear // 1st term (Jan-Apr)
		) {
			categorisedMedia["this term"].push(mediaItem);
		} else if (
			mediaMonth >= 4 &&
			mediaMonth <= 7 &&
			mediaYear === currentYear // 2nd term (May-Aug)
		) {
			categorisedMedia["this term"].push(mediaItem);
		} else if (
			mediaMonth >= 8 &&
			mediaMonth <= 11 &&
			mediaYear === currentYear // 3rd term (Sep-Dec)
		) {
			categorisedMedia["this term"].push(mediaItem);
		}

		// Last term (Previous term based on academic calendar)
		if (
			(mediaMonth >= 4 && mediaMonth <= 7 && mediaYear === currentYear) || // 2nd term was last term (May-Aug)
			(mediaMonth >= 8 && mediaMonth <= 11 && mediaYear === currentYear - 1) // 3rd term was last term (Sep-Dec)
		) {
			categorisedMedia["last term"].push(mediaItem);
		} else if (
			mediaMonth >= 0 &&
			mediaMonth <= 3 &&
			mediaYear === currentYear - 1 // 1st term was last term (Jan-Apr)
		) {
			categorisedMedia["last term"].push(mediaItem);
		}

		// This year
		if (mediaYear === currentYear) {
			categorisedMedia["this year"].push(mediaItem);
		}

		// Previous years
		if (mediaYear < currentYear) {
			categorisedMedia["previous years"].push(mediaItem);
		}
	});
}

export function render() {
	if (page?.dataset.page === "home") {
		sortedEvents.length >= 3
			? renderCards(featuredEvents, buildFeaturedEventCard, sortedEvents, 3)
			: renderCards(
					featuredEvents,
					buildFeaturedEventCard,
					sortedEvents,
					sortedEvents.length
			  );
		sortedNews.length >= 3
			? renderCards(recentNews, buildNewsCard, sortedNews, 3)
			: renderCards(recentNews, buildNewsCard, sortedNews, sortedNews.length);
	}

	if (page?.dataset.page === "events") {
		categoriseEvents();

		// Render sections
		handleItemSection(
			thisMonthEvents,
			categorisedEvents["this month"],
			buildEventCard,
			"No scheduled events"
		);
		handleItemSection(
			easterEvents,
			categorisedEvents["easter"],
			buildEventCard,
			"No scheduled events"
		);

		handleItemSection(
			trinityEvents,
			categorisedEvents["trinity"],
			buildEventCard,
			"No scheduled events"
		);

		handleItemSection(
			michaelmasEvents,
			categorisedEvents["michaelmas"],
			buildEventCard,
			"No scheduled events"
		);
	}

	if (page?.dataset.page === "news") {
		filterNews();

		newsFilterOptionItem.addEventListener("click", (e) => {
			const clickedItem = event.target.closest("li");
			if (!clickedItem) {
				console.warn("[News Card Filter] Clicked item is not a valid item.");
				return;
			}

			const clickedItemTextContent = clickedItem.textContent
				.trim()
				.toLowerCase();
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

			news.innerHTML = "";

			handleItemSection(
				news,
				categorisedNews[clickedItemTextContent],
				buildNewsCard,
				"No news available"
			);
		});
	}

	if (page?.dataset.page === "gallery") {
		filterMedia();

		mediaFilterOptionItem.addEventListener("click", (e) => {
			const clickedItem = event.target.closest("li");
			if (!clickedItem) {
				console.warn("[Media Filter] Clicked item is not a valid item.");
				return;
			}

			const clickedItemTextContent = clickedItem.textContent
				.trim()
				.toLowerCase();
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

			media.innerHTML = "";

			handleItemSection(
				media,
				categorisedMedia[clickedItemTextContent],
				buildMedia,
				"No media available"
			);
		});
	}
}
