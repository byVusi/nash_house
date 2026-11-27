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
			"The words “A dream for many, a reality for few”, which are closely related to the house, captures exactly what it means to wear the iconic blue and white Nash colours. To be in Nash is not about the bare minimum - it is about living up to the standards, traditions and values that make the House not just any other House but Nash house.",
		],
		"/nash_house/assets/articles/2025_house_report.html",
		"2025-12-04",
		"assets/media/images/gallery/2025/2025-nash-4.jpg",
		"Mila Xego and Luke Brooks, Head of House and Deputy Head of House, respectively",
	),

	// 2026 News

	new News(
		"2026 House Report",
		"Chris Chapman, Head of House",
		[
			"If there is one thing this year taught us, it is that the true strength of a House is not measured by the trophies or wins, but by the way its boys stand together through every victory and every setback. Although not every Inter-House event went as planned, through both the wins and the losses, there were always laughs, smiles and an undeniable sense of Nash gees.",
		],
		"/nash_house/assets/articles/2026_house_report.html",
		"2026-10-12",
		"assets/media/images/gallery/2026/2026-nash-0.jpg",
		"Nash boys in the common room",
	),

	new News(
		"2027 Remove Welcome",
		"Tiri Pasipanodya, Head of House",
		[
			"I know every Head of House will say that their House is a family but Nash House has truly become a piece of me. A piece of my soul. A place where I have met extended brothers whose shoulders I can cry on, which I did last week actually. I would like to create that for you guys.",
		],
		"/nash_house/assets/articles/2026_remove_welcome_hoh_address.html",
		"2026-10-15",
		"assets/media/images/nash-banner.jpg",
		"Nash House crest",
	),

	new News(
		"An U15 All-Star",
		"Vusi Mathonsi, Housemaster",
		[
			"Congratulations to Amani Masuku, who was named one of the U15 All-Stars at the Inanda Hoops Classic Challenge. He was part of the U15 team that finished 2nd, going down to Saheti 33-38, in a tightly contested final. The SJC team included other Nashtonians; Nhlavu Hlungwane, Zimasa Mabandla, Sifiso Mkhonza, Jordan Sithole and Hugo Stahljans.",
		],
		"/nash_house/assets/articles/2026_an_all_star.html",
		"2026-10-26",
		"assets/media/images/gallery/2026/2026-nash-6.jpg",
		"U15 All-Stars posing for a photo",
	),

	new News(
		"A Farewell to Matrics",
		"Vusi Mathonsi, Housemaster",
		[
			"As the final exam pen is set down and a quiet stillness settles over the quad, a distinct realisation takes hold: the long-anticipated year has finally reached its horizon. Standing together in the uniform worn with pride over the years, the nostalgia arrives not as a single memory, but as a swell of shared early-morning practices, electric warcries, and quiet moments in the common room.",
		],
		"/nash_house/assets/articles/2026_goodbye_matrics.html",
		"2026-11-27",
		"assets/media/images/classes/2026_matrics.png",
		"Photos of students from the class of 2026",
	),
];

export const sortedNews = sortObjectsByDate(news, "date", false);

// Special CSS styling applied when true
sortedNews[0].nextEvent = true;
