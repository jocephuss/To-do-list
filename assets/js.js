// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskBtn = document.getElementById('taskBtn')


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let nextId = JSON.parse(localStorage.getItem("nextId"));

    // Check if the value is null or undefined
    if (nextId === null || nextId === undefined) {
        // If it's null or undefined, set the global variable to 1
        nextId = 1;
    } else {
        // If it exists, increment the value by one
        nextId++;
    }

    // Store the updated value back to localStorage
    localStorage.setItem("nextId", JSON.stringify(nextId));

}
function saveNextIdToStorage(nextId) {
    localStorage.setItem('nextId', JSON.stringify(nextId));
}



// Todo: create a function to create a task card

//creating the task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card project-card draggable my-3')
        .attr('data-task-id', task.id);

    const taskName = $('<div>')
        .addClass('card-header h4')
        .text(task.name);

    const taskBody = $('<div>').addClass('card-body');

    const taskDescription = $('<p>')
        .addClass('card-text')
        .text(task.description);

    const taskDueDate = $('<p>')
        .addClass('card-text')
        .text(task.dueDate);

         // Calculate the difference in days between today and the due date
    const dueDate = new Date(task.dueDate);
    const timeDiff = dueDate.getTime() - Date.now();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Set the card color based on the due date
    if (daysDiff <= 0) {
        taskCard.addClass('bg-danger'); // Past due (red)
    } else if (daysDiff <= 1) {
        taskCard.addClass('bg-warning'); // Due in 1 day (yellow)
    }

    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);

    cardDeleteBtn.on('click', function () {
        // Handle delete task functionality here
        handleDeleteTask(task.id);
        // Remove the task card from the UI
        taskCard.remove();

        let tasks = JSON.parse(localStorage.getItem('nextId'));
        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem('nextId', JSON.stringify(tasks));

        localStorage.removeItem(nextId);
    });

    taskBody.append(taskDescription, taskDueDate, cardDeleteBtn);
    taskCard.append(taskName, taskBody);
    if(task.status == "to-do"){
        $("#todo-cards").append(taskCard)
    }
    if(task.status == "in-progress"){
        $("#in-progress-cards").append(taskCard)
    }
    if(task.status == "done"){
        $("#done-cards").append(taskCard)
    }


    return taskCard;
}


// Event listener to create div card on submit of modal form

$('#taskBtn').on('click', function (e) {
    e.preventDefault();
    const nextId = JSON.parse(localStorage.getItem("nextId")) || [];

    const task = {
        id: nextId.length,
        name: $('#taskName').val(),
        description: $('#taskDescription').val(),
        dueDate: $('#taskDueDate').val(),
        status:"to-do"
    };

     const taskCard = createTaskCard(task);

    nextId.push(task);
    localStorage.setItem('nextId', JSON.stringify(nextId));

    taskCard.draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) { 
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
    });
});


function handleDeleteTask(){}


// Todo: create a function to handle dropping a task into a new status lane

function handleDrop(event, ui) {
    const newStatus = (event.target.id);
    const taskId = (ui.draggable[0].getAttribute("data-task-id"));

    const savedTasks = JSON.parse(localStorage.getItem("nextId")) || [];

    const updatedTasks = savedTasks.map(function(task){
        if(task.id == taskId) {
            task.status = newStatus
        }

        return task
    })

    localStorage.setItem('nextId', JSON.stringify(updatedTasks));

    window.location.reload();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function() {
    // Check if there are tasks in localStorage
    if(localStorage.getItem('nextId')) {
        const tasks = JSON.parse(localStorage.getItem('nextId'));
        tasks.forEach(task => {
            createTaskCard(task);
        });
    }

    $('.lane').droppable({
    accept: ".draggable",
    drop: handleDrop

    })

    $(".draggable").draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
          // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
    })


});

