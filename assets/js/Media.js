import { sortObjectsByDate } from "./utils.js";

export class Media {
	constructor(
		date,
		imageSRC = "./assets/media/images/placeholder.jpg",
		imageALT = ""
	) {
		this.date = date;
		this.imageSRC = imageSRC;
		this.imageALT = imageALT;
	}
}

export const media = [];

// 2025 uploads
for (let i = 0; i < 18; i++) {
	media.push(
		new Media(
			"2025-12-04",
			`assets/media/images/gallery/2025/2025-nash-${i}.jpg`
		)
	);
}

export const sortedMedia = sortObjectsByDate(media, "date", false);
