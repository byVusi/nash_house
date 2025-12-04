import { months, formatDay } from "./utils.js";

export function buildFeaturedEventCard(event) {
	const card = document.createElement("div");
	const icon = document.createElement("i");
	const date = document.createElement("div");
	const title = document.createElement("div");

	// Different styling for the event coming next
	event.nextEvent
		? card.classList.add("event-card", "d-flex", "upcoming-event")
		: card.classList.add("event-card", "d-flex");

	icon.classList.add("fa", "fa-calendar-o");
	date.classList.add("event-date");
	title.classList.add("event-title");

	// Format the day
	const day = formatDay(new Date(event.date).getUTCDate());
	const month = new Date(event.date).getMonth();
	const year = new Date(event.date).getFullYear();

	date.textContent = day + " " + months[month].slice(0, 3) + " " + year;

	title.textContent = event.title;

	card.appendChild(icon);
	card.appendChild(date);
	card.appendChild(title);

	return card;
}

export function buildNewsCard(news) {
	const card = document.createElement("div");
	const image = document.createElement("img");
	const body = document.createElement("div");
	const title = document.createElement("h5");
	const subtitle = document.createElement("h6");
	const text = document.createElement("p");
	const link = document.createElement("a");

	card.classList.add("card");
	card.style.width = "18rem";

	image.setAttribute("src", news.imageSRC);
	image.setAttribute("alt", news.imageALT);
	image.classList.add("card-img-top");

	body.classList.add("card-body");

	title.classList.add("card-title");
	title.textContent = news.title;

	subtitle.classList.add("card-subtitle", "text-body-secondary", "mb-2");
	subtitle.textContent = news.subtitle;

	text.classList.add("card-text");
	text.textContent =
		news.text[0].trim().slice(-1) !== "."
			? news.text[0].trim().slice(0, 140) + "..."
			: news.text[0].trim().slice(0, 140) + "..";

	link.classList.add("card-link");
	link.setAttribute("href", news.linkHREF);
	link.textContent = "Read more";

	body.appendChild(title);
	body.appendChild(subtitle);
	body.appendChild(text);
	body.appendChild(link);

	image.setAttribute("loading","lazy");
	card.appendChild(image);
	card.appendChild(body);

	return card;
}

export function buildEventCard(event) {
	const card = document.createElement("div");
	const date = document.createElement("p");
	const details = document.createElement("div");
	const title = document.createElement("h5");

	card.classList.add("event-container", "d-flex", "mb-0");
	date.classList.add("event-date");
	details.classList.add("event-details");
	title.classList.add("event-title");

	const eventDate = new Date(event.date);
	const day = formatDay(eventDate.getUTCDate());
	const month = months[eventDate.getMonth()].slice(0, 3);
	date.textContent = day + " " + month;

	title.textContent = event.title;

	details.appendChild(title);

	card.appendChild(date);
	card.appendChild(details);

	return card;
}

export function buildMedia(media) {
	const content = document.createElement("img");
	content.setAttribute("src", media.imageSRC);
	content.setAttribute("alt", media.imageALT);

	return content;
}


