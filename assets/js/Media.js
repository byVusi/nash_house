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
for (let i = 0; i < 22; i++) {
	media.push(new Media("2025-12-04", `assets/media/gallery/2025/2025-nash-{i}.jpg`));
}

export const sortedMedia = sortObjectsByDate(media, "date", false);
