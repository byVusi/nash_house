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
	// 2025 News
	new News(
		"2025 House Report",
		"Mila Xego, Head of House",
		["The words “A dream for many, a reality for few”, which are closely related to the house, captures exactly what it means to wear the iconic blue and white Nash colours. To be in Nash is not about the bare minimum - it is about living up to the standards, traditions and values that make the House not just any other House but Nash house. Many people dream of being a part of something so full and rich with heritage and culture, but only a few have the honour of calling themselves a Nashtonian. But as the saying goes “With great power (honour) comes great responsibility”: to give your best, to support your fellow Nashtonians and uphold the pride of the house in everything we do."],
		"https://drive.google.com/file/d/18_RrRi0SzUFhjrdotT2QJkoNBLULw1Hx/view?usp=drive_link",
		"2025-12-04",
		"assets/media/images/gallery/2024/2024-nash-9.jpg",
		"Mila Xego and Luke Brooks, Head of House and Deputy Head of House, respectively"
	)
];

export const sortedNews = sortObjectsByDate(news, "date", false);
