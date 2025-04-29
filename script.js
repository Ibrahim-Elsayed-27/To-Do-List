let inputTask = document.getElementById("task-input");
let addBtn = document.querySelector(".input-strip label");
let tasksList = document.getElementsByClassName('tasks')[0];


window.onload = loadTasksFromLocalStorage;


addBtn.addEventListener('click', addNewTask);
inputTask.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addNewTask();
    }
});
tasksList.addEventListener('click', (event)=>{
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle("task-done");
    }

    if (event.target.tagName === 'I'){
        event.target.parentElement.remove();
    }
    saveTasksToLocalStorage();
});


function addNewTask(){
    let taskName = inputTask.value;
    if (taskName != ''){
        let newTask = document.createElement("li");
        newTask.innerHTML = `${taskName} <i class="fa-solid fa-xmark"></i>`
        tasksList.appendChild(newTask);
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.tasks li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent.trim(),
            done: li.classList.contains('task-done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.done) li.classList.add('task-done');
        li.innerHTML = `${task.text} <i class="fa-solid fa-xmark">`;
        tasksList.appendChild(li);
    });
}
