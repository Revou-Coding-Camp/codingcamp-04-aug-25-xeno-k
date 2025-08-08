document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const filterStatus = document.getElementById("filter-status");
  const deleteAllBtn = document.getElementById("delete-all-btn");

  let tasks = [];
  let editingTaskId = null;

  addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = taskDate.value;

    if (!task || !date) {
      alert("Please enter both task and date!");
      return;
    }

    if (editingTaskId !== null) {
      
      tasks = tasks.map(t =>
        t.id === editingTaskId ? { ...t, name: task, date: date } : t
      );
      editingTaskId = null;
      addTaskBtn.textContent = "Add Task";
    } else {
   
      const newTask = {
        id: Date.now(),
        name: task,
        date: date,
        completed: false
      };
      tasks.push(newTask);
    }

    taskInput.value = "";
    taskDate.value = "";

    renderTasks();
  });

  function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
      if (filterStatus.value === "completed") return task.completed;
      if (filterStatus.value === "incomplete") return !task.completed;
      return true;
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-gray-300">No tasks found!</td></tr>`;
      return;
    }

    filteredTasks.forEach(task => {
      const row = document.createElement("tr");
      row.classList.add("border-b", "border-gray-700", "hover:bg-white/10", "transition-all");

      row.innerHTML = `
        <td class="px-4 py-3 border border-gray-600">${task.name}</td>
        <td class="px-4 py-3 border border-gray-600">${task.date}</td>
        <td class="px-4 py-3 border border-gray-600">${task.completed ? "✅ Done" : "⌛ Incomplete"}</td>
        <td class="px-4 py-3 border border-gray-600 flex gap-2 flex-wrap">
          <button class="toggle-status-btn bg-gray-200 hover:bg-yellow-600 text-gray-700 px-3 py-1 rounded-lg flex items-center gap-1" data-id="${task.id}">
            <i data-feather="${task.completed ? "rotate-ccw" : "check-circle"}"></i> ${task.completed ? "Undo" : "Done"}
          </button>
          <button class="edit-btn bg-gray-200 hover:bg-blue-600 text-gray-700 px-3 py-1 rounded-lg flex items-center gap-1" data-id="${task.id}">
            <i data-feather="edit"></i> Edit
          </button>
          <button class="delete-btn bg-gray-200 hover:bg-red-600 text-700 px-3 py-1 rounded-lg flex items-center gap-1" data-id="${task.id}">
            <i data-feather="trash"></i> Delete
          </button>
        </td>
      `;

      taskList.appendChild(row);
    });

    feather.replace(); 
    setEventListeners();
  }

  function setEventListeners() {
    document.querySelectorAll(".delete-btn").forEach(btn =>
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
      })
    );

    document.querySelectorAll(".toggle-status-btn").forEach(btn =>
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        tasks = tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        renderTasks();
      })
    );

    document.querySelectorAll(".edit-btn").forEach(btn =>
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const task = tasks.find(t => t.id === id);
        if (task) {
          taskInput.value = task.name;
          taskDate.value = task.date;
          editingTaskId = id;
          addTaskBtn.textContent = "Save Changes";
        }
      })
    );
  }

  filterStatus.addEventListener("change", renderTasks);

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      tasks = [];
      renderTasks();
    }
  });

  renderTasks();
});
