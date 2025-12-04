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
		"2025 House Report",
		"Mila Xego, Head of House",
		"",
		"",
		"2025-12-04",
		"assets/media/images/gallery/2024/2024-nash-9.jpg",
		"Mila Xego and Luke Brooks, Head of House and Deputy Head of House, respectively"
	),
	new News(
		"2024 House Report",
		"Thomas Kruger, Head of House",
		["This year, Nash House demonstrated its unity, resilience and competitive edge across a wide range of events, making it a truly memorable year. Competing against the other eight Houses, we stood out in various activities, and each one played a key role in our success. Here's a chronological recap of our performance throughout the year:"],
		"https://docs.google.com/document/d/1hatsivOU_gtEil-hoGgJQBlfSebMGI4HcVm1ENLpK3c/view?tab=t.0",
		"2024-12-01",
		"assets/media/images/gallery/2024/2024-nash-29.jpg",
		"Nash 1st Rugby Team winning Inter-House Rugby 2024"
		)
];

export const sortedNews = sortObjectsByDate(news, "date", false);




