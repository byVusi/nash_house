import { sortObjectsByDate } from "./utils.js";

export class News {
	constructor(
		title,
		subtitle,
		text,
		linkHREF,
		date,
		imageSRC = "./assets/media/images/placeholder.jpg",
		imageALT,
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
	// 2025 News
	new News(
		"2025 House Report",
		"Mila Xego, Head of House",
		[
			"The words “A dream for many, a reality for few”, which are closely related to the house, captures exactly what it means to wear the iconic blue and white Nash colours. To be in Nash is not about the bare minimum - it is about living up to the standards, traditions and values that make the House not just any other House but Nash house. Many people dream of being a part of something so full and rich with heritage and culture, but only a few have the honour of calling themselves a Nashtonian. But as the saying goes “With great power (honour) comes great responsibility”: to give your best, to support your fellow Nashtonians and uphold the pride of the house in everything we do.",
		],
		"/nash_house/assets/articles/2025_house_report.html",
		"2025-12-04",
		"assets/media/images/gallery/2025/2025-nash-4.jpg",
		"Mila Xego and Luke Brooks, Head of House and Deputy Head of House, respectively",
	),

	// 2026 News

	new News(
		"2025 House Report",
		"Christopher Chapman, Head of House",
		[
			"If there is one thing this year taught us, it is that the true strength of a House is not measured by the trophies or wins, but by the way its boys stand together through every victory and every setback. Although not every Inter-House event went as planned, through both the wins and the losses, there were always laughs, smiles and an undeniable sense of Nash gees.",
		],
		"/nash_house/assets/articles/2026_house_report.html",
		"2026-10-12",
		"assets/media/images/gallery/2026/2026-nash-0.jpg",
		"Nash boys in the common room",
	),
];

export const sortedNews = sortObjectsByDate(news, "date", false);

// Special CSS styling applied when true
sortedNews[0].nextEvent = true;
