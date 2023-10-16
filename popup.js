export default class Popup {
	constructor() {
		this.popup = document.getElementById("popup");
		this.popupContent = document.querySelector(".popup-content");
		this.popupMessage = document.getElementById("popup-message");
		this.popupClose = document.getElementById("popup-close");

		this.popupClose.addEventListener("click", () => {
			this.hide();
		});

		this.popup.addEventListener("click", (e) => {
			if (e.target === this.popup) {
				this.hide();
			}
		});
	}

	show(message) {
		this.popupMessage.textContent = message;
		this.popup.style.display = "flex";
	}

	hide() {
		this.popup.style.display = "none";
	}
}