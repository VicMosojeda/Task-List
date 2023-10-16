'use strict';

import { addTask, toggleTC, deleteT } from "./controllers.js";
import { tasks } from "./models.js";
// Vista (View)
export const taskList = document.getElementById("taskList");
export const taskInput = document.getElementById("taskInput");
export const addTaskButton = document.getElementById("addTask");

// asignar eventos a elementos
addTaskButton.addEventListener("click", addTask);

export function displayTask() {
	taskList.innerHTML = "";

	// Obtén las tareas del localStorage
	const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];

	// Si hay tareas en el localStorage, agrégalas al modelo
	if (savedTask.length > 0) {
		tasks.length = 0; // Limpia el modelo actual
		tasks.push(...savedTask);
	};

	tasks.forEach(task => {
		const taskItem = document.createElement("li");
		taskItem.innerHTML = `
			<input type="checkbox" ${task.completed ? "checked" : ""}>
			<span>${task.text}</span>
			<button class="delete" data-id="${task.id}">Eliminar</button>
		`;

		const deleteButton = taskItem.querySelector(".delete");
		deleteButton.addEventListener("click", deleteT);

		const checkbox = taskItem.querySelector("input[type=checkbox]");
		checkbox.addEventListener("change", toggleTC);

		taskList.appendChild(taskItem);
	});
}



// Mostrar las tareas iniciales
displayTask();