window.onload = loadTasks;
let currentTask = null;

function loadTasks() {
  if (localStorage.getItem("tasks") == null) return;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    const list = document.querySelector("ul");
    const item = document.createElement("li");
    item.innerHTML = `<input type="checkbox" class="check-button" onclick="taskDone(this)" ${
      task.completed ? "checked" : ""
    }>
    <input type="text" value="${
      task.task
    }" onfocus="getCurrentTask(this)" onblur="rewriteTask(this)" class="task ${
      task.completed ? "done" : ""
    }">
    <button class="remove" onclick = "removeTask(this)">X</button>`;
    list.insertBefore(item, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector(".add-task input");
  const list = document.querySelector("ul");
  if (task.value === "") {
    window.alert("Вы ничего не ввели! Введите задачу.");
    return false;
  }

  if (document.querySelector(`input[value="${task.value}"]`)) {
    window.alert("Такая задача уже существует");
    return;
  }

  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false },
    ])
  );

  const item = document.createElement("li");
  item.innerHTML = `<input type="checkbox" class="check-button" onclick="taskDone(this)">
    <input type="text" value="${
      task.value
    }" onfocus="getCurrentTask(this)" onblur="rewriteTask(this)" class="task ${
    task.completed ? "done" : ""
  }">
    <button class="remove" onclick = "removeTask(this)">X</button>`;
  list.insertBefore(item, list.children[0]);
  task.value = "";
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

function taskDone(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("done");
}

function getCurrentTask(event) {
  currentTask = event.value;
}

function rewriteTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  if (event.value === "") {
    window.alert("Вы оставили пустым поле задачи! Введите что-нибудь");
    event.value = currentTask;
    return;
  }
  tasks.forEach((task) => {
    if (task.task === event.value) {
      window.alert("Такая задача уже существует");
      event.value = currentTask;
      return;
    }
  });
  tasks.forEach((task) => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
