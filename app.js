const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// load event listners
loadEventListeners();
// load all event listners
function loadEventListeners(){ 
   // DOM load event
   document.addEventListener('DOMContentLoaded', getTasks);

   // add a task
   form.addEventListener('submit', addTask);
   // remove task
   taskList.addEventListener('click', removeTask);
   // clear all task 
   clearBtn.addEventListener('click', clearTasks);
   // filter task event
   filter.addEventListener('keyup', filterTask);
}

// get Tasks
function getTasks() {
   let tasks;
   if (localStorage.getItem('tasks') == null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));

   }
   tasks.forEach(function (task){

      // li create li element 
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';
      // create text node and append to li
      li.appendChild(document.createTextNode(task));
      // create a new link 
      const link = document.createElement('a');
      //add class
      link.className = 'delete-item secondary-content';
      // add icon html
      link.innerHTML = '<i class = "fa fa-remove"> </i>';

      // append the link to li
      li.appendChild(link);
      // append li to ui
      taskList.appendChild(li);
   }
   );
}



// add task 
function addTask(e) {
   if (taskInput.value == '') {
      alert('Input a task');
   } 

   // li create li elements 
   const li = document.createElement('li');
   // add class
   li.className = 'collection-item';
   // create text node and append to li
   li.appendChild(document.createTextNode(taskInput.value));
   // create a new link 
   const link = document.createElement('a');
   //add class
   link.className = 'delete-item secondary-content';
   // add icon html
   link.innerHTML = '<i class = "fa fa-remove"> </i>';

   // append the link to li
   li.appendChild(link);
   // append li to ui
   taskList.appendChild(li);

   // Store in local storage
   storeTaskInLocalStorage(taskInput.value);



   // clear input
   taskInput.value = '';
   e.preventDefault();

}

function storeTaskInLocalStorage(task) {
   let tasks;
   if (localStorage.getItem('tasks') == null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));

   }
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}



// remove task
function removeTask(e) {
   if (e.target.parentElement.classList.contains('delete-item')){
      if (confirm('Are you sure?')) {
         e.target.parentElement.parentElement.remove();

         // remove tasks from local storage
         removeTaskFromLocalStorage
         (e.target.parentElement.parentElement);

      }
   }
  // console.log(e.target);
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
   console.log(taskItem);

   let tasks;
   if (localStorage.getItem('tasks') == null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));

   }
   tasks.forEach(function (task, index) {
      if (taskItem.textContent == task) {
         tasks.splice(index, 1);
      }
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
   //taskList.innerHTML = '';
   console.log('clear tasks');
   //faster
   while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
   }

   //clear task from local storage
   clearTaskFromLocalStorage();

}

//  clear task from local storage
function clearTaskFromLocalStorage(){
   localStorage.clear();
}

// filter task

function filterTask(e) {
   const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(function (task) {
      const item = task.firstChild.textContent;
      if (item.toLocaleLowerCase().indexOf(text) != -1) {
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
   });

   console.log(text);
}
