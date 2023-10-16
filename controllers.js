'use strict';

import { deleteTFM, updateTCIM, addTTM, tasks } from "./models.js";
import { taskInput, displayTask } from "./views.js";
import Popup from "./popup.js";

// Controlador (Controller
const switcher = document.querySelector('.btn-switch');

// ico toggle
const btnSwitcher = document.querySelector('.ico-switcher')

// Ventana Emergente
const popup = new Popup();

// Switcher
switcher.addEventListener("click", () => {

	// Cambia el tema y actualiza la fuente de la imagen del btn
	const body = document.body;
	const darkMode = body.classList.toggle('dark-theme');
	body.classList.toggle('light-theme');

	// Guardar la preferencia de tema en localStorage
	localStorage.setItem("theme", darkMode ? "dark-theme" : "light-theme");

	// condicional para no perder los estilos del tema
	if (darkMode) {
    body.classList.remove('light-theme');
  	} else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  	}

	switcher.innerHTML = darkMode ? `<img src="./ico/light.svg" alt="Light" title="Light"/>` : `<img src="./ico/dark.svg" alt="Dark" title="Dark"/>`

});


// saveTasksToLocalStorage
function saveTTLS() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// addTask
export function addTask() {
	const taskText = taskInput.value.trim();
	if (taskText !== "") {
		const task = addTTM(taskText);

		// Guardar localStorage
		saveTTLS(tasks);

		displayTask();
		taskInput.value = "";
	} else {
		popup.show("El campo esta vacío");
	}
}
// deleteTask
export function deleteT (e) {
	const taskId = parseInt(e.target.getAttribute("data-id"));
	deleteTFM(taskId);

	// Guardar localStorage
	saveTTLS(tasks);

	displayTask();
}
// toggleTaskCompleted
export function toggleTC(e) {
	const checkbox = e.target;
	if (checkbox && checkbox.parentNode) {
		const listItem = checkbox.parentNode;
		const taskId = parseInt(listItem.querySelector(".delete").getAttribute("data-id"));
		const completed = checkbox.checked;
		updateTCIM(taskId, completed);

		// Guardar localStorage
		saveTTLS(tasks);

		displayTask();
	}
}

// Condicion para poder guardar el tema que se dejo por ultima ves
document.addEventListener("DOMContentLoaded", ()=>{
	// Recuperar la preferencia de tema desde localStorage
	const savedTheme = localStorage.getItem("theme");
	const body = document.body;
	const icon = btnSwitcher

	// Aplicar la clase de tema al cuerpo
	if (savedTheme === "dark-theme") {
		body.classList.add("dark-theme");
		icon.src = "./ico/light.svg";
	} else {
		body.classList.add("light-theme");
	}
});

// Teclado
document.addEventListener("DOMContentLoaded", () => {
	// Agregar tareas con la tecla ENTER
	taskInput.addEventListener("keydown", (e) => {
		if (e.keyCode === 13) {
			addTask();
		}
	});

	// Quitar la ventana emergente con ESC
	document.addEventListener("keydown", (e) => {
		if (e.keyCode === 27) {
			popup.style.display = "none";
		}
	});	
});

