// // Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));
// let addTask = document.getElementById("#task-btn")
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// function generateTaskId() {
//   let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
//   localStorage.setItem("nextId", nextId + 1);
//   return nextId;
// }



// // function to create a task card

//   function createTaskCard(task) {
//     const taskCard = document.createElement("div");
//     taskCard.classList.add("task-card");
//     taskCard.innerHTML = `
//         <div class="task-title">${task.title}</div>
//         <div class="task-description">${task.description}</div>
//         <div class="task-due-date">${task.dueDate}</div>
//         <button class="delete-task-btn" data-task-id="${task.id}">Delete</button>
//     `;
//     return taskCard;
// }

// function renderTaskList() {
//   taskList.forEach(task => {
//       const taskCard = createTaskCard(task);
//       $(`#${task.status}`).append(taskCard);

//       // Make the task card draggable
//       $(taskCard).draggable({
//           revert: "invalid",
//           start: function(event, ui) {
//               $(this).addClass("dragging");
//           },
//           stop: function(event, ui) {
//               $(this).removeClass("dragging");
//           }
//       });
//   });
// }

// // Function to handle adding a new task
// function handleAddTask(event) {
//   event.preventDefault();

//   const title = document.getElementById('taskName').value;
//   const description = document.getElementById('taskDescription').value;
//   const dueDate = document.getElementById('taskDueDate').value;

//   if (!title || !description || !dueDate) {
//       alert("Please fill in all fields");
//       return;
//   }

//   const taskId = generateTaskId();
//   const task = { id: taskId, title, description, dueDate, status: "to-do" };

//   const taskCard = createTaskCard(task);
//   $("todo-cards").append(taskCard);

//   // Make the task card draggable
//   $(taskCard).draggable({
//       revert: "invalid",
//       start: function(event, ui) {
//           $(this).addClass("dragging");
//       },
//       stop: function(event, ui) {
//           $(this).removeClass("dragging");
//       }
//   });

//   taskList.push(task);
//   localStorage.setItem("tasks", JSON.stringify(taskList));

//   // Close the modal after adding the task
//   $('#addTaskModal').modal('hide');
// }

// // Function to handle deleting a task
// function handleDeleteTask(event) {
//   const taskId = $(event.target).data("taskId");
//   taskList = taskList.filter(task => task.id !== taskId);
//   localStorage.setItem("tasks", JSON.stringify(taskList));
//   $(event.target).closest(".task-card").remove();
// }



      

// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {
    
       

// }

// // Todo: create a function to handle adding a new task
// function handleAddTask(event){

// }

// // Todo: create a function to handle deleting a task
// function handleDeleteTask(event){

// }

// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {

// });
