import { sortObjectsByDate } from "./utils.js";

export class Media {
	constructor(date, imageSRC = "https://fakeimg.pl/600x400", imageALT = "") {
		this.date = date;
		this.imageSRC = imageSRC;
		this.imageALT = imageALT;
	}
}

export const media = [];

for (let i = 0; i < 53; i++) {
	media.push(
		new Media(
			"2024-12-09",
			`assets/media/images/gallery/2024/2024-nash-${i}.jpg`
		)
	);
}

export const sortedMedia = sortObjectsByDate(media, "date", false);
