// const htmlElement = document.querySelector("html");
// const themeDropdownMenuItems = document.querySelectorAll(".theme li");

// /**
//  * Toggles the theme based on the user's selection from a dropdown menu.
//  * Updates the `data-bs-theme` attribute on the HTML element, marks the selected
//  * dropdown item as active, and stores the selected theme in localStorage.
//  *
//  * @param {Event} event - The event object associated with the dropdown item click.
//  *
//  * @example
//  * // Example usage:
//  * document.querySelector('#themeDropdown').addEventListener('click', toggleTheme);
//  */
// export function toggleTheme(event) {
// 	const clickedDropdownItem = event.target.closest("li");
// 	if (!clickedDropdownItem) {
// 		console.warn("[THEME] Clicked item is not a valid dropdown item.");
// 		return;
// 	}

// 	const theme = clickedDropdownItem.textContent.trim().toLowerCase();
// 	if (!["light", "dark", "auto"].includes(theme)) {
// 		console.warn("[THEME] Invalid theme selected.");
// 		return;
// 	}

// 	let _theme;
// 	if (theme === "auto") {
// 		let currentTime = new Date().getHours();
// 		if (currentTime >= 7 && currentTime < 18) {
// 			_theme = "light";
// 		} else {
// 			_theme = "dark";
// 		}

// 		htmlElement.setAttribute("data-bs-theme", _theme);
// 	} else {
// 		htmlElement.setAttribute("data-bs-theme", theme);
// 	}

// 	// Remove .active from all
// 	themeDropdownMenuItems.forEach((item) => {
// 		item.children[0].classList.remove("active");
// 	});

// 	// Add .active to clicked
// 	clickedDropdownItem.children[0].classList.add("active");

// 	// Save selected theme in localStorage
// 	localStorage.setItem("house-website-theme", theme);
// }

// /**
//  * Sets up the theme based on the user's previously selected option stored in localStorage.
//  * Updates the `data-bs-theme` attribute on the HTML element and marks the corresponding
//  * dropdown item as active.
//  *
//  * @example
//  * // Example usage:
//  * setupTheme();
//  */
// export function setupTheme() {
// 	// Get previously selected theme from localStorage
// 	const theme = localStorage.getItem("house-website-theme");

// 	if (!theme) {
// 		console.warn("No theme has been found in local storage.");
// 		return;
// 	}

// 	// Remove .active from all <li>
// 	themeDropdownMenuItems.forEach((item) => {
// 		item.children[0].classList.remove("active");
// 	});

// 	switch (theme) {
// 		case "light":
// 		case "dark":
// 			htmlElement.setAttribute("data-bs-theme", theme);
// 			const index = theme === "light" ? 0 : 1;
// 			if (themeDropdownMenuItems[index]) {
// 				themeDropdownMenuItems[index].children[0].classList.add("active");
// 			}
// 			break;
// 		case "auto":
// 			let _theme;
// 			let currentTime = new Date().getHours();
// 			if (currentTime >= 7 && currentTime < 18) {
// 				_theme = "light";
// 			} else {
// 				_theme = "dark";
// 			}
// 			htmlElement.setAttribute("data-bs-theme", _theme);
// 			if (themeDropdownMenuItems[2]) {
// 				themeDropdownMenuItems[2].children[0].classList.add("active");
// 			}
// 			break;
// 		default:
// 			console.warn("[THEME] Oops! Something went wrong.");
// 	}
// }

const htmlElement = document.querySelector("html");
const themeDropdownMenuItems = document.querySelectorAll(".theme li");

const THEMES = ["light", "dark", "auto"];

/**
 * Updates the theme on the HTML element and manages active states for dropdown items.
 *
 * @param {string} theme - The theme to be applied ("light", "dark", or "auto").
 * @param {boolean} isAuto - Whether the theme is set to auto.
 */
function applyTheme(theme, isAuto = false) {
	let finalTheme = theme;

	if (isAuto) {
		const currentTime = new Date().getHours();
		finalTheme = currentTime >= 7 && currentTime < 18 ? "light" : "dark";
	}

	htmlElement.setAttribute("data-bs-theme", finalTheme);

	// Update active state for dropdown items
	themeDropdownMenuItems.forEach((item) => {
		item.children[0].classList.remove("active");
		if (item.textContent.trim().toLowerCase() === theme) {
			item.children[0].classList.add("active");
		}
	});
}

/**
 * Toggles the theme based on the user's selection from a dropdown menu.
 * Stores the selected theme in localStorage.
 *
 * @param {Event} event - The event object associated with the dropdown item click.
 */
export function toggleTheme(event) {
	const clickedDropdownItem = event.target.closest("li");
	if (!clickedDropdownItem) {
		console.warn("[THEME] Clicked item is not a valid dropdown item.");
		return;
	}

	const theme = clickedDropdownItem.textContent.trim().toLowerCase();
	if (!THEMES.includes(theme)) {
		console.warn("[THEME] Invalid theme selected.");
		return;
	}

	applyTheme(theme, theme === "auto");

	// Save selected theme in localStorage
	localStorage.setItem("house-website-theme", theme);
}

/**
 * Sets up the theme based on the user's previously selected option stored in localStorage.
 */
export function setupTheme() {
	const storedTheme = localStorage.getItem("house-website-theme");

	if (!storedTheme || !THEMES.includes(storedTheme)) {
		console.warn("No valid theme found in local storage.");
		return;
	}

	applyTheme(storedTheme, storedTheme === "auto");
}
