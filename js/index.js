import List from './List.js';
import Task from './Task.js';

let pendingList = new List('pending');
let completedList = new List('completed');

let searchPending = document.getElementById('search-pending');
let searchCompleted = document.getElementById('search-completed');
let buttonAddPending = document.getElementById('add-pending');
let buttonAddCompleted = document.getElementById('add-completed');

let counterId = 0;

searchPending.addEventListener('keyup', (e) => {
  let input = e.target.value.trim().toLowerCase();
  pendingList.searchTasks(input);
});

searchCompleted.addEventListener('keyup', (e) => {
  let input = e.target.value.trim().toLowerCase();
  completedList.searchTasks(input);
});

buttonAddPending.addEventListener('click', () => {
  let userEntry = prompt('Nueva Tarea Pendiente');
  if (userEntry) {
    counterId += 1;
    pendingList.addTask(new Task(counterId, userEntry, false));
  }
});

buttonAddCompleted.addEventListener('click', () => {
  let userEntry = prompt('Nueva Tarea Completada');
  if (userEntry) {
    counterId += 1;
    completedList.addTask(new Task(counterId, userEntry, true));
  }
});

