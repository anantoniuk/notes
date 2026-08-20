import * as storage from "./helpers/storage.js";
import { renderTask } from "./helpers/render.js";

const TASK_STORAGE_KEY = "taskList";

const taskList = storage.load(TASK_STORAGE_KEY) || [];
const container = document.querySelector("[data-task-block]");
const form = document.querySelector("[data-task-form]");

const activeTasksText = document.querySelectorAll("[data-active-task]");
const allTasksText = document.querySelectorAll("[data-all-task]");
const interestText = document.querySelector("[data-interest]");
const completedTasksText = document.querySelector("[data-completed-task]");
const controlBtns = document.querySelector(".tasks__list");
const btnClear = document.querySelector("[data-action='clear']");
const line = document.querySelector("[data-line]");

// ~~~~~~~~

let currentFilter = "all";

const findCompletedTasks = () => {
  return taskList.filter((task) => task.made);
};

const findActiveTasks = () => {
  return taskList.filter((task) => !task.made);
};

const findProgress = () => {
  const quantityAllTasks = taskList.length;
  const quantityСompletedTasks = findCompletedTasks().length;
  const quantityTasksProgress = findActiveTasks().length;

  if (quantityAllTasks !== 0) {
    const interes =
      100 - Math.floor((100 * quantityTasksProgress) / quantityAllTasks);
    interestText.textContent = interes;
    line.style.backgroundImage = `linear-gradient(
    to right,
    var(--colorAccent) ${interes}%,
    var(--colorBgTasks) ${interes}%
  )`;
  } else {
    interestText.textContent = 100;
    line.style.backgroundImage = "none";
  }
  for (let i = 0; i < 2; i++) {
    activeTasksText[i].textContent = quantityTasksProgress;
    allTasksText[i].textContent = quantityAllTasks;
  }
  completedTasksText.textContent = quantityСompletedTasks;
};

const handleMadeTask = (event) => {
  const target = event.target;
  if (target.dataset.action !== "made") {
    return;
  }
  const task = target.closest("[data-id]");
  if (task) {
    const id = task.dataset.id;
    const idToChange = taskList.findIndex((task) => task.id === id);
    taskList[idToChange].made = target.checked;

    storage.save(TASK_STORAGE_KEY, taskList);
    renderFilteredTasks();
    findProgress();
  }
};

const handleSaveTask = (event) => {
  event.preventDefault();
  const form = event.target;
  const title = form.taskTitle.value;
  const description = form.taskDescription.value;
  const priority = form.priority.value;
  const task = {
    id: crypto.randomUUID(),
    title: title,
    description: description,
    made: false,
    priority: priority,
  };

  taskList.push(task);
  storage.save(TASK_STORAGE_KEY, taskList);
  renderFilteredTasks();
  findProgress();

  form.reset();
};

const handleRemoveTask = (event) => {
  const target = event.target;
  if (target.dataset.action !== "remove") {
    return;
  }
  const task = target.closest("[data-id]");
  if (task) {
    const id = task.dataset.id;
    const idToRemove = taskList.findIndex((task) => task.id === id);
    taskList.splice(idToRemove, 1);
    renderFilteredTasks();
    findProgress();
    storage.save(TASK_STORAGE_KEY, taskList);
  }
};

const handleClear = (event) => {
  const target = event.target;
  if (!target.dataset.action) {
    return;
  }

  storage.clear();
  taskList.length = 0;
  renderFilteredTasks();
  findProgress();
};
const handleChangeFilter = (event) => {
  const button = event.target.closest(".tasks__btn");

  if (!button) {
    return;
  }

  const currentButton = document.querySelector(".current");

  if (currentButton) {
    currentButton.classList.remove("current");
  }

  button.classList.add("current");
  currentFilter = button.dataset.filter;
  renderFilteredTasks();
};

const renderFilteredTasks = () => {
  if (currentFilter === "all") {
    renderTask(container, taskList);
  }

  if (currentFilter === "active") {
    renderTask(container, findActiveTasks());
  }

  if (currentFilter === "completed") {
    renderTask(container, findCompletedTasks());
  }
};
// ~~~~~~~~

renderTask(container, taskList);
findProgress();

form.addEventListener("submit", handleSaveTask);
container.addEventListener("click", handleRemoveTask);
container.addEventListener("change", handleMadeTask);
btnClear.addEventListener("click", handleClear);
controlBtns.addEventListener("click", handleChangeFilter);
