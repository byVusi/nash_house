import { sortObjectsByDate } from "./utils.js";

export class Media {
	constructor(date, imageSRC = "https://fakeimg.pl/600x400", imageALT = "") {
		this.date = date;
		this.imageSRC = imageSRC;
		this.imageALT = imageALT;
	}
}

export const media = [];

// 2025 uploads
for (let i = 0; i < 15; i++) {
	media.push(
		new Media("2025-12-04",
		`assets/media/images/gallery/2025/2025-nash-${i}.jpeg`
		)
	);
}

// 2024 uploads
for (let i = 0; i < 53; i++) {
	media.push(
		new Media(
			"2024-12-09",
			`assets/media/images/gallery/2024/2024-nash-${i}.jpg`
		)
	);
}

export const sortedMedia = sortObjectsByDate(media, "date", false);


