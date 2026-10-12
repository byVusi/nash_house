import { sortObjectsByDate } from "./utils.js";

class Event {
	constructor(title, date, nextEvent = false) {
		this.title = title.trim();
		this.date = date;
		this.nextEvent = nextEvent;
	}
}

const events = [
	// 2027 Easter
	new Event("School Opens", "2027-01-13"),

	// 2027 Trinity Term

	// 2027 Michaelmas Term
];

export const sortedEvents = sortObjectsByDate(events, "date", true);

// Special CSS styling applied when true
sortedEvents[0].nextEvent = true;
