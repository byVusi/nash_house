import { sortObjectsByDate } from "./utils.js";

class Event {
	constructor(title, date, nextEvent = false) {
		this.title = title.trim();
		this.date = date;
		this.nextEvent = nextEvent;
	}
}

const events = [
	// 2026 Easter
	new Event("Remove Camp", "2026-01-16"),
	new Event("Remove and New Boys' Induction", "2026-01-23"),
	new Event("Inter-House Gala Pre-Events (Day 1)", "2026-01-26"),
	new Event("Inter-House Gala Pre-Events (Day 2)", "2026-01-27"),
	new Event("Inter-House Gala", "2026-01-29"),
	new Event("Grobs", "2026-02-18"),
	new Event("Half Term Starts", "2026-02-19"),
	new Event("Half Term Ends", "2026-02-24"),
	new Event("Inter-House Basketball", "2026-02-25"),
	new Event("Senior Inter-House Tennis", "2026-03-07"),
	new Event("Inter-House Music (Day 1)", "2026-03-30"),
	new Event("Inter-House Music (Day 2)", "2026-03-31"),
	new Event("School Closes", "2026-04-01")
];

export const sortedEvents = sortObjectsByDate(events, "date", true);

// Special CSS styling applied when true
sortedEvents[0].nextEvent = true;

