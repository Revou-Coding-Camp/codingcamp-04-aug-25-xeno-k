const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  // Create task wrapper
  const li = document.createElement('li');
  li.className = "bg-gray-700 px-4 py-2 rounded-md";

  // Task content wrapper
  const contentDiv = document.createElement('div');
  contentDiv.className = "flex justify-between items-start";

  // Task text
  const span = document.createElement('span');
  span.textContent = text;
  span.className = "flex-1 cursor-pointer";
  span.addEventListener('click', () => {
    span.classList.toggle('line-through');
    span.classList.toggle('text-gray-400');
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.className = "text-red-400 hover:text-red-600 ml-4";
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  // Get current date/time
  const now = new Date();
  const dateText = now.toLocaleDateString();
  const timeText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const dateSpan = document.createElement('div');
  dateSpan.textContent = `📅 ${dateText} at ${timeText}`;
  dateSpan.className = "text-sm text-gray-400 mt-1";

  // Assemble task item
  contentDiv.appendChild(span);
  contentDiv.appendChild(deleteBtn);
  li.appendChild(contentDiv);
  li.appendChild(dateSpan);
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';
}
