'use strict';

// Modelo (Modelo)
export const tasks = [];

// Funciones relaciones con el modelo
// addTaskToModel
export function addTTM(text) {
	const task = {
		id: Date.now(),
		text: text,
		completed: false
	};
	tasks.push(task);
	return task;
}
// deleteTaskFromModel
export function deleteTFM(taskId) {
	const taskIndex = tasks.findIndex(task => task.id === taskId);
	if (taskIndex !== -1) {
		tasks.splice(taskIndex, 1);
	}
}
// updateTaskCompletionInModel
export function updateTCIM(taskId, completed) {
	const task = tasks.find(task => task.id === taskId);
	if (task) {
		task.completed = completed;
	}
}