import { sortObjectsByDate, excludePastDates } from "./utils.js";

class Event {
	constructor(title, date, nextEvent = false) {
		this.title = title.trim();
		this.date = date;
		this.nextEvent = nextEvent;
	}
}

const events = [
	// 2026
	new Event("College Carol Service", "2026-11-08"),
	new Event("Study Day", "2026-11-09"),
	new Event("School Examinations Begin", "2026-11-10"),
	new Event("School Closes", "2026-12-02"),

	// 2027
	new Event("Remove Camp", "2027-01-01"),
	new Event("Interhouse Chess", "2027-01-22"),
	new Event("GROBS", "2027-02-17"),
	new Event("Half Term", "2027-02-18"),
	new Event("School Opens", "2027-02-23"),
	new Event("Nash Meet The Parents", "2027-02-23"),
	new Event("Interhouse Basketball", "2027-02-25"),
	new Event("School Holidays", "2027-03-22"),
	new Event("Return to School", "2027-03-30"),
	new Event("Interhouse Music Final Dress Rehearsals (Day 1)", "2027-04-07"),
	new Event("Interhouse Music Final Dress Rehearsals (Day 2)", "2027-04-07"),
	new Event("Interhouse Music (Day 1", "2027-04-07"),
	new Event("Interhouse Music (Day 2", "2027-04-07"),
	new Event("School Closes", "2027-04-09"),

	new Event("School Opens", "2027-05-04"),
	new Event("School Holiday - Youth Day", "2027-06-16"),
	new Event("Half Term", "2027-06-25"),
	new Event("School Opens", "2027-07-05"),
	new Event("School Closes", "2027-08-06"),

	new Event("School Opens", "2027-09-07"),
	new Event("School Holiday - Heritage Day", "2027-09-24"),
	new Event("Half Term", "2027-10-21"),
	new Event("School Opens", "2027-08-26"),
	new Event("School Closes", "2027-12-03"),
];

export const sortedEvents = excludePastDates(
	sortObjectsByDate(events, "date"),
	"date",
);

// Special CSS styling applied when true
if (sortedEvents.length > 0) sortedEvents[0].nextEvent = true;
