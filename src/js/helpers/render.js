import { createdTaskMurkup } from "./create-tasks";

export const renderTask = (container, data) => {
  if (!container) {
    console.error("container відсутній");
    return;
  }
  if (data.length === 0) {
    const murkup = "<p class='no-task__msg'>Завдання відсутні</p>";
    container.innerHTML = murkup;
    return;
  }
  const murkup = createdTaskMurkup(data);
  container.innerHTML = murkup;
};
