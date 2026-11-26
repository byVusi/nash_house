import { sortObjectsByDate, excludePastDates } from "./utils.js";

class Event {
	constructor(title, date, nextEvent = false) {
		this.title = title.trim();
		this.date = date;
		this.nextEvent = nextEvent;
	}
}

const events = [
	// 2027
	new Event("Nash Boarding opens", "2027-01-12"),
	new Event("Remove Camp departs", "2027-01-14"),
	new Event("Remove Camp returns", "2027-01-16"),
	new Event("Interhouse Swimming Gala", "2027-01-21"),
	new Event("Remove Induction Service", "2027-01-22"),
	new Event("Senior Interhouse Tennis", "2027-02-09"),
	new Event("Nash Meet The Parents", "2027-02-23"),
	new Event("Interhouse Music", "2027-04-05"),
	new Event("Interhouse Cross Country", "2027-04-09"),
];

export const sortedEvents = excludePastDates(
	sortObjectsByDate(events, "date"),
	"date",
);

// Special CSS styling applied when true
if (sortedEvents.length > 0) sortedEvents[0].nextEvent = true;
