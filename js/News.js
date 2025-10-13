import { sortObjectsByDate } from "./utils.js";

export class News {
	constructor(
		title,
		subtitle,
		text,
		linkHREF,
		date,
		imageSRC = "https://fakeimg.pl/600x400",
		imageALT
	) {
		this.title = title;
		this.subtitle = subtitle;
		this.text = text;
		this.linkHREF = linkHREF;
		this.date = date;
		this.imageSRC = imageSRC;
		this.imageALT = imageALT;
	}
}

const news = [
	new News(
		"Untitled Jan",
		"The subtitle",
		"Lorem ipsum bla bla bla",
		"#",
		"2024-01-12"
	),
	new News(
		"Untitled Feb",
		"The subtitle",
		"Lorem ipsum bla bla bla",
		"#",
		"2024-02-12"
	),
	new News(
		"Untitled May",
		"The subtitle",
		"Lorem ipsum bla bla bla",
		"#",
		"2024-05-12"
	),
	new News(
		"Untitled Sep",
		"The subtitle",
		"Lorem ipsum bla bla bla",
		"#",
		"2024-09-12"
	),
	new News(
		"Untitled Dec",
		"The subtitle",
		"Lorem ipsum bla bla bla",
		"#",
		"2024-12-12"
	),
];

export const sortedNews = sortObjectsByDate(news, "date", false);
