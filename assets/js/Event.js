import { sortObjectsByDate } from "./utils.js";

class Event {
	constructor(title, date, nextEvent = false) {
		this.title = title.trim();
		this.date = date;
		this.nextEvent = nextEvent;
	}
}

const events = [new Event("Remove Camp", "2025-01-11")];

export const sortedEvents = sortObjectsByDate(events, "date", true);

// Special CSS styling applied when true
sortedEvents[0].nextEvent = true;
