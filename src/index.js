document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  let tasks = [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const taskDescription = document.getElementById("new-task-description").value;
    const priority = document.getElementById("priority").value;
    const user = document.getElementById("user").value;
    const dueDate = document.getElementById("due-date").value;

    if (taskDescription.trim() !== "") {
      const task = { description: taskDescription, priority, user, dueDate };
      tasks.push(task);
      renderTasks();
      form.reset();
    }
  });

  function renderTasks() {
    taskList.innerHTML = tasks.map((task, index) => `
      <li style="color: ${task.priority == 1 ? 'red' : task.priority == 2 ? 'yellow' : 'green'}">
        <strong>${task.description}</strong> - Assigned to: ${task.user}, Due: ${task.dueDate}
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </li>
    `).join("");
  }

  window.editTask = (index) => {
    const task = tasks[index];
    document.getElementById("new-task-description").value = task.description;
    document.getElementById("priority").value = task.priority;
    document.getElementById("user").value = task.user;
    document.getElementById("due-date").value = task.dueDate;
    tasks.splice(index, 1); // Remove the task being edited
    renderTasks();
  };

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  document.getElementById("sort-asc").addEventListener("click", () => {
    tasks.sort((a, b) => a.priority - b.priority);
    renderTasks();
  });

  document.getElementById("sort-desc").addEventListener("click", () => {
    tasks.sort((a, b) => b.priority - a.priority);
    renderTasks();
  });
});
