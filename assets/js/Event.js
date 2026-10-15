import { sortObjectsByDate } from "./utils.js";

class Event {
	constructor(title, date, nextEvent = false) {
		this.title = title.trim();
		this.date = date;
		this.nextEvent = nextEvent;
	}
}

const events = [
	// 2026
	new Event("Half Term", "2026-10-22"),
	new Event("School Opens", "2026-10-27"),
	new Event("Giving Day (Day 1)", "2026-10-28"),
	new Event("Giving Day (Day 2)", "2026-10-29"),
	new Event("College Carol Service", "2026-11-08"),
	new Event("Study Day", "2026-11-09"),
	new Event("School Examinations Begin", "2026-11-10"),
	new Event("School Closes", "2026-12-02"),
];

export const sortedEvents = sortObjectsByDate(events, "date", true);

// Special CSS styling applied when true
if (sortedEvents.length > 0) sortedEvents[0].nextEvent = true;
