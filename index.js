let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	let tasks = localStorage.getItem('tasks');

	if(!tasks) {
		return items;
	}

	tasks = JSON.parse(tasks);

	if(tasks.length > 0) {
		return tasks;
	}

	return items;
}

function updateStorage() {
	const items = getTasksFromDOM();
	saveTasks(items);
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");
  	textElement.textContent = item;

	deleteButton.addEventListener('click', (evt) => {
		clone.remove();
		updateStorage()
	});

	duplicateButton.addEventListener('click', (evt) => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		updateStorage()
	});

	editButton.addEventListener('click', (evt) => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('blur', (evt) => {
		textElement.setAttribute('contenteditable', 'false');
		textElement.textContent = textElement.textContent.trim();
		updateStorage()
	})

  	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");

	const tasks = [];

	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	})
	
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();

items.forEach((item) => {
	listElement.append(createItem(item));
});

formElement.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const taskText = inputElement.value.trim();

	if(!taskText) {
		return;
	}

	listElement.prepend(createItem(taskText));

	updateStorage();

	inputElement.value = '';
})

