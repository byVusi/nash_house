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

export const sortedMedia = sortObjectsByDate(media, "date", false);



